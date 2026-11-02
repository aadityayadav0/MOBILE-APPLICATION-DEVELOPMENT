import streamlit as st

from src import db, model, nlp, triage, tts

st.set_page_config(page_title="SwasthVaani", page_icon="🩺")
db.init()

st.title("🩺 SwasthVaani")
st.caption("Ye sirf guidance/screening tool hai, diagnosis nahi. Emergency mein 108 par call karein.")

audio = st.audio_input("🎤 Apni takleef Hindi mein bolkar batayein")
typed = st.text_input("ya yahan likhein (jaise: mujhe tez bukhar aur sar dard hai)")

if st.button("Check karein"):
    text = typed
    if audio is not None:
        from src import speech  # lazy import: Vosk model sirf tab load ho jab audio ho
        text = speech.transcribe(audio)

    if not text:
        st.warning("Pehle bolkar ya likhkar apni takleef batayein.")
        st.stop()

    st.write(f"**Aapne kaha:** {text}")
    symptoms = nlp.extract_symptoms(text)
    predictions = model.predict(symptoms) if symptoms else []
    result = triage.assess(symptoms, predictions)

    if symptoms:
        st.write("**Pehchaane gaye lakshan:**", ", ".join(symptoms))
    if predictions:
        st.write("**Sambhavit sthitiyan (sirf andaza):**")
        for name, p in predictions:
            st.write(f"- {name} ({p:.0%})")

    level = result["level"]
    show = {"EMERGENCY": st.error, "DOCTOR": st.warning, "HOME": st.success}.get(level, st.info)
    show(result["message"])

    st.audio(tts.speak(result["message"]))
    db.save(text, symptoms, level)

with st.expander("Pichhli jaanch (history)"):
    for created_at, user_text, level in db.recent():
        st.write(f"{created_at} | {level} | {user_text}")
