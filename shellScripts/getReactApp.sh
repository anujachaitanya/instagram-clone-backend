mkdir public/posts
git clone https://github.com/anujachaitanya/instagram-clone-frontend.git client
cd client 
npm install
npm run build 
mv ./build/ ../
cd ..
rm -rf client