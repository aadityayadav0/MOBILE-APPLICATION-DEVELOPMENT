
                ${item.symptoms}

                <br>

                <small>
                ${item.time}
                </small>

            </div>

        `).join("");

}


loadHistory();

</script>

</body>

</html>
HTML

cat > static/style.css <<'CSS'
* {
    box-sizing: border-box;
}


body {

    margin: 0;

    font-family:
        Arial,
        sans-serif;

    background:
        linear-gradient(
            135deg,
            #e8f8f5,
            #eef5ff
        );

    color: #17212b;
}


.container {

    max-width: 700px;

    margin: auto;

    padding: 20px;
}


.header {

    text-align: center;

    padding: 20px 10px;
}


.logo {

    font-size: 55px;
}


h1 {

    margin: 5px;

    color: #087f5b;
}


.header p {

    color: #607080;
}


.card {

    background: white;

    margin: 16px 0;

    padding: 20px;

    border-radius: 18px;

    box-shadow:
        0 5px 20px
        rgba(0,0,0,0.08);
}


textarea {

    width: 100%;

    min-height: 130px;

    padding: 14px;

    border: 1px solid #ccd5dc;

    border-radius: 12px;

    font-size: 17px;

    resize: vertical;
}


.buttons {

    margin-top: 12px;
}


button {

    border: none;

    padding: 13px 17px;

    margin: 4px;

    border-radius: 10px;

    background: #087f5b;

    color: white;

    font-size: 15px;
}


button:active {

    transform: scale(0.97);
}


.voice {

    background: #1971c2;
}


.result {

    border-left: 6px solid #087f5b;
}


.urgency {

    display: inline-block;

    padding: 8px 12px;

    border-radius: 8px;

    font-weight: bold;

    margin: 8px 0;
}


.emergency {

    background: #ffe3e3;

    color: #c92a2a;
}


.doctor {

    background: #fff3bf;

    color: #e67700;
}


.monitor {

    background: #d3f9d8;

    color: #2b8a3e;
}


.history-item {

    padding: 12px 0;

    border-bottom:
        1px solid #eeeeee;
}


.warning {

    background: #fff3bf;

    padding: 15px;

    border-radius: 12px;

    margin-bottom: 20px;

    font-size: 14px;
}


.hidden {

    display: none;
}


#status {

    color: #087f5b;

    font-weight: bold;
}
CSS

ls -R
python app.py
CTRL + C
python app.py
trlc 
cd ~/storage/downloads
ls | grep Swasth
unzip -o SwasthVaani_Ultimate_Professional.zip
cd SwasthVaani_Ultimate
ls
PORT=5001 python app.py
cd ~/storage/downloads/SwasthVaani_Ultimate
sed -i 's/int(os.environ.get("PORT",5000))/int(os.environ.get("PORT",5001))/g' app.py
grep -n "app.run" app.py
cd ~/storage/downloads
unzip -o SwasthVaani_Ultimate_Professional.zip
cd SwasthVaani_Ultimate
python -m pip install -r requirements.txt
PORT=5001 python app.pycd ~/storage/downloads
unzip -o SwasthVaani_Ultimate_Professional.zip
cd SwasthVaani_Ultimate
python -m pip install -r requirements.txt
PORT=5001 python app.pycd ~/storage/downloads
ls | grep Swasth
ls | grep Swasthcd ~/storage/downloads
ls | grep Swasth
CTRL+Ccd ~/storage/downloads
unzip -o SwasthVaani_Professional_V5.zip
cd SwasthVaani_Professional_V2
python -m pip install -r requirements.txt
python app.py
CTRL+C
cd ~/storage/downloads
unzip -o SwasthVaani_Professional_V5.zip
cd SwasthVaani_Professional_V2
python -m pip install -r requirements.txt
python app.py
cd ~/storage/downloads
ls
cd SwasthVaani_Professional_V5
cd ~/storage/downloads
ls
cd SwasthVaani_Professional_V5
pwd
grep -n "app.run" app.py
CTRL + C
sed -i 's/port=5111/port=5120/g' app.py
python app.py
pkill -f "python app.py"
pkill -9 -f "app.py"
cd ~/storage/downloads
unzip -o SwasthVaani_Professional_V3.zip
cd SwasthVaani_Professional_V2
python -m pip install -r requirements.txt
python app.py
pkill -9 -f "app.py"
cd ~/storage/downloads
pkill -f "python app.py"cd ~/storage/downloads
unzip -o SwasthVaani_Professional_V6_VoiceFix.zip -d SwasthVaani_V6
pkill -f "python app.py"
cd ~/storage/downloads
unzip -o SwasthVaani_Professional_V6_VoiceFix.zip -d SwasthVaani_V6
cd SwasthVaani_V6
python -m pip install -r requirements.txt
PORT=5120 python app.py
pkill -9 -f "app.py"
cd ~/storage/downloads
unzip -o SwasthVaani_Professional_V2.zip
cd SwasthVaani_Professional_V2
python -m pip install -r requirements.txt
python app.py
pkill -9 -f "app.py"
cd ~/storage/downloads
cd ~/storage/downloads
unzip -o SwasthVaani_Professional_V4.zip
cd SwasthVaani_Professional_V2
python -m pip install -r requirements.txt
python app.py
sed -i 's/port=5099/port=5111/g' app.py
grep -n "app.run" app.py
app.run(host="127.0.0.1", port=5111, debug=False)
python app.py
CTRL+C
pkill -f "python app.py"
cd ~/storage/downloads/SwastVaani_Ultimate_Professional_NEW
pwd
ls
grep -n "recognition\|onresult\|interimResults\|continuous" static/app.js
cd ~/storage/downloads
rm -rf V7_FIX
unzip -o SwasthVaani_Professional_V7_VoiceFix.zip -d V7_FIX
cp V7_FIX/static/app.js SwastVaani_Ultimate_Professional_NEW/static/app.js
cp V7_FIX/static/style.css SwastVaani_Ultimate_Professional_NEW/static/style.css
cd ~/storage/downloads/SwastVaani_Ultimate_Professional_NEW
python app.py
cd ~/storage/downloads
ls *.zip
rm -rf SwastVaani_Ultimate_Professional_NEW
unzip -o SwastVaani_Ultimate_Professional.zip -d SwastVaani_Ultimate_Professional_NEW
cd SwastVaani_Ultimate_Professional_NEWpython -m pip install -r requirements.txt
sed -i 's/port=[0-9]*/port=5125/' app.py
grep -n "app.run" app.py
python app.py
CTRL+C
pkill -f "python app.py"
cd ~/storage/downloads/SwastVaani_Ultimate_Professional_NEW
pkg update
pkg install git
termux-setup-storage
pkg update
pkg install git
termux-setup-storage
pkg update && pkg upgrade -y
pkg install git -y
ls ~/storage/shared/Download
cd ~/storage/downloads/NO_SQL_DATABASE_DESIGN-
git status
git remote -v
cp ~/storage/shared/Download/BCA305P-AS02.pdf .
git add .
git commit -m "Add BCA305P labsheet"
git branch -M main
git push -u origin main
termux-setup-storage
cd ~/storage/downloads/NO_SQL_DATABASE_DESIGN-
unzip -o ~/storage/shared/Download/BCA305P-AS02_Solutions.zip -d ~/storage/shared/Download/
cp ~/storage/shared/Download/BCA305P-AS02_Solutions/BCA305P-AS02_Solutions.js .
cp ~/storage/shared/Download/BCA305P-AS02_Solutions/README.md .
git add BCA305P-AS02_Solutions.js README.md
git commit -m "Add BCA305P lab sheet solutions"
git push -u origin main
termux-setup-storage
pkg update
pkg install git unzip -y
cd ~/storage/downloads
ls
find ~/storage/shared -type f -iname "BCA305P-AS02.pdf" 2>/dev/null
cd NO_SQL_DATABASE_DESIGN-
git status
git remote -v
git push -u origin main
cd ~/storage/downloads/NO_SQL_DATABASE_DESIGN-
git remote -v
git status
git config --global --unset credential.helper
termux-setup-storage
git status
ls -la
git pull --no-rebase origin main --allow-unrelated-histories
cd ~/storage/downloads/NO_SQL_DATABASE_DESIGN-
pwd
ls
git status
git merge --abort
git status
git pull --no-rebase origin main --allow-unrelated-histories
git push -u origin main
git pull --no-rebase origin main --allow-unrelated-histories
igit pull --no-rebase origin main --allow-unrelated-histories
git merge --abort
cp BCA305P-AS01_Solutions.md ~/BCA305P-AS01_Solutions_backup.md
git pull --no-rebase origin main --allow-unrelated-historie
git pull --no-rebase origin main --allow-unrelated-histories
git status
git merge --abort
git status
git pull --no-rebase origin main --allow-unrelated-histories
git push -u origin main
git merge --abort
git switch -c upload-labsheet
git status
git branch --show-current
git push -u origin upload-labsheet
git fetch origin
git switch -c main-upload origin/main
git checkout upload-labsheet -- BCA305P-AS01_Solutions.md
git add BCA305P-AS01_Solutions.md
git commit -m "Add Lab Sheet 4 solutions to main"
git push -u origin main-upload
termux-setup-storage
ls -l BCA305P-AS03_Solutions.zip
ls ~/storage/downloads
pwd
ls
cd ~/storage/downloads/NO_SQL_DATABASE_DESIGN-
ls
find ~/storage/downloads -type f -iname "*AS03*.zip"
find ~/storage/downloads -iname "*AS03*" 2>/dev/null
cd ~/storage/downloads
ls -la
find . -iname "*AS03*" 2>/dev/null
cd ~/storage/downloads
ls
cd ~/storage/downloads/NO_SQL_DATABASE_DESIGN-
find ~/storage/downloads -iname "*AS03*" 2>/dev/null
cd ~/storage/downloads/NO_SQL_DATABASE_DESIGN-
ls
cp -r ~/storage/downloads/AS03_FOLDER_NAME .
find ~/storage/downloads -type f \( -iname "*.zip" -o -iname "*AS03*" \) 2>/dev/null
find ~/storage/downloads -type f | grep -iE 'AS03|BCA305P'
find ~/storage/downloads -maxdepth 3 -type d
find ~/storage/downloads -maxdepth 4 -type f | tail -50
cd ~/storage/downloads
ls -lah
find ~/storage/downloads -type f -name "*.zip" 2>/dev/null
ls
cp ~/storage/downloads/BCA305P-AS03_Solutions.zip .
ls -lh BCA305P-AS03_Solutions.zip
git add BCA305P-AS03_Solutions.zip
git commit -m "Add Lab Sheet AS03 solutions ZIP"
git push
cd ~/storage/downloads/NO_SQL_DATABASE_DESIGN-
cp ~/storage/downloads/BCA305P-AS03_Solutions.zip .
git add BCA305P-AS03_Solutions.zip
git commit -m "Add Lab Sheet AS03 solutions ZIP"
git push
cd ~/storage/downloads/NO_SQL_DATABASE_DESIGN-
cp ~/storage/downloads/BCA305P-AS03_Corrected_Solutions.zip .
git add BCA305P-AS03_Corrected_Solutions.zip
git commit -m "Add corrected AS03 solutions"
git push origin main-upload
cd ~/storage/downloads/NO_SQL_DATABASE_DESIGN-
cd ~/storage/downloads
ls
cd ~/storage/downloads/NO_SQL_DATABASE_DESIGN-
cp -r ~/storage/downloads/BCA305P-AS03_Corrected_Solutions .
ls
git status
git add BCA305P-AS03_Corrected_Solutions/
git status
umv BCA305P-AS03_Corrected_Solutions/BCA305P-AS03_Corrected_Solutions/* BCA305P-AS03_Corrected_Solutions/
rmdir BCA305P-AS03_Corrected_Solutions/BCA305P-AS03_Corrected_Solutions
git add -A
git status
cp -r BCA305P-AS03_Corrected_Solutions/BCA305P-AS03_Corrected_Solutions/. BCA305P-AS03_Corrected_Solutions/
rm -r BCA305P-AS03_Corrected_Solutions/BCA305P-AS03_Corrected_Solutions
git add -A
git status
git commit -m "Add corrected AS03 solutions with code files"
git push origin main-upload
cd ~/storage/downloads/NO_SQL_DATABASE_DESIGN-
git status
cd ~/storage/downloads/NO_SQL_DATABASE_DESIGN-
git status
head -80 NoSQL_LabSheet_1_Solutions/mongosh/lab01_all_practicals.js
ls -lh NoSQL_LabSheet_1_Solutions.zip NoSQL_LabSheet_1_Solutions/solutions.md NoSQL_LabSheet_1_Solutions/mongosh/lab01_all_practicals.js
git status
git add NoSQL_LabSheet_1_Solutions/
git status
git rm NoSQL_LabSheet_1_Solutions/solutions.md.save
git status
git rm --cached NoSQL_LabSheet_1_Solutions/solutions.md.save
rm NoSQL_LabSheet_1_Solutions/solutions.md.save
git status
git commit -m "Add readable NoSQL LabSheet 1 solution files"
git push origin main-upload
cd ~/storage/downloads
ls
termux-setup-storage
cd ~/storage/downloads/NO_SQL_DATABASE_DESIGN-
ls
