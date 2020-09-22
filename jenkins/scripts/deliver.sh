echo 'The following "npm" command buildsLetsFindNode application'
echo '"/var/jenkins_home/workspace/LetsFindNode" directory),'
set -x
cd api
npm run start:prod
set +x

set -x
# npm start &
sleep 1
# echo $! > .pidfile
set +x

echo 'Now...'
echo 'Visit http://localhost:1989 to see LetsFindNode application in action.'