from flask import Flask, render_template, request, jsonify
import sqlite3
from datetime import datetime

app = Flask(__name__)

DATABASE = "swasthvaani.db"


def init_database():
    connection = sqlite3.connect(DATABASE)

    connection.execute("""
        CREATE TABLE IF NOT EXISTS history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            symptoms TEXT NOT NULL,
            urgency TEXT NOT NULL,
            guidance TEXT NOT NULL,
            created_at TEXT NOT NULL
        )
    """)

    connection.commit()
    connection.close()


def analyze_symptoms(text):

    text = text.lower()

    symptoms = []

    keywords = {
        "बुखार": ["बुखार", "fever"],
        "खांसी": ["खांसी", "खाँसी", "cough"],
        "गले में दर्द": ["गले में दर्द", "गला दर्द", "sore throat"],
        "सिरदर्द": ["सिरदर्द", "सिर दर्द", "headache"],
        "जुकाम": ["जुकाम", "नाक बहना", "runny nose", "cold"],
        "शरीर में दर्द": ["शरीर दर्द", "बदन दर्द", "body ache"],
        "थकान": ["थकान", "कमजोरी", "fatigue", "weakness"],
        "मतली": ["मतली", "जी मिचलाना", "nausea"],
        "उल्टी": ["उल्टी", "vomiting"],
        "दस्त": ["दस्त", "loose motion", "diarrhea"],
        "पेट दर्द": ["पेट दर्द", "stomach pain"],
        "सीने में दर्द": ["सीने में दर्द", "छाती में दर्द", "chest pain"],
        "सांस लेने में दिक्कत": [
            "सांस लेने में दिक्कत",
            "सांस फूलना",
            "breathing difficulty",
            "shortness of breath"
        ],
        "चक्कर": ["चक्कर", "dizziness"],
        "रैश": ["रैश", "दाने", "rash"]
    }

    for name, words in keywords.items():
        for word in words:
            if word in text:
                symptoms.append(name)
                break

    if "सीने में दर्द" in symptoms or "सांस लेने में दिक्कत" in symptoms:

        urgency = "EMERGENCY"

        guidance = (
            "सीने में दर्द या सांस लेने में दिक्कत गंभीर हो सकती है। "
            "तुरंत स्थानीय emergency service या नजदीकी अस्पताल से संपर्क करें।"
        )

    elif (
        "उल्टी" in symptoms
        or "दस्त" in symptoms
        or (
            "बुखार" in symptoms
            and "खांसी" in symptoms
        )
    ):

        urgency = "DOCTOR SOON"

        guidance = (
            "आपके बताए लक्षणों के लिए डॉक्टर या नजदीकी clinic "
            "से जल्द सलाह लेना उचित है।"
        )

    elif symptoms:

        urgency = "MONITOR"

        guidance = (
            "इन लक्षणों पर नजर रखें। यदि लक्षण बढ़ते हैं, "
            "लंबे समय तक रहते हैं या चिंता बढ़ती है तो healthcare "
            "professional से सलाह लें।"
        )

    else:

        urgency = "UNKNOWN"

        guidance = (
            "लक्षण स्पष्ट रूप से पहचान में नहीं आए। "
            "कृपया symptoms को थोड़ा और detail में लिखें।"
        )

    return {
        "matched": symptoms,
        "urgency": urgency,
        "guidance": guidance
    }


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/analyze", methods=["POST"])
def analyze():

    data = request.get_json()

    text = data.get("symptoms", "").strip()

    if not text:
        return jsonify({
            "error": "कृपया symptoms लिखें या बोलें।"
        }), 400

    result = analyze_symptoms(text)

    connection = sqlite3.connect(DATABASE)

    connection.execute(
        """
        INSERT INTO history
        (symptoms, urgency, guidance, created_at)
        VALUES (?, ?, ?, ?)
        """,
        (
            text,
            result["urgency"],
            result["guidance"],
            datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        )
    )

    connection.commit()
    connection.close()

    return jsonify(result)


@app.route("/history")
def history():

    connection = sqlite3.connect(DATABASE)

    rows = connection.execute(
        """
        SELECT symptoms, urgency, guidance, created_at
        FROM history
        ORDER BY id DESC
        LIMIT 10
        """
    ).fetchall()

    connection.close()

    history_data = []

    for row in rows:

        history_data.append({
            "symptoms": row[0],
            "urgency": row[1],
            "guidance": row[2],
            "time": row[3]
        })

    return jsonify(history_data)


init_database()


if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=False
    )
