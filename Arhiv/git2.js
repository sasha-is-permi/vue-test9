

// надо представиться если не представлялись. Один раз после создания проекта
// Информация записывается в .git/config
git init // создает git/config
git config --local user.name "Alexandr"         - имя пользователя для проекта
git config --local user.email sasha-is-permi@mail.ru         - e-mail


// После создания или изменения файлов в проекте
git add -A
git commit -m"1"

// Только первый раз при создании.
// Информация записывается в .git/config
git remote add origin https://github.com/sasha-is-permi/admin-panel
// Посылаем файлы проекта на github
// В следующий раз можно посылать файлы более простой командой:
// git push


// Повторно- если не выходили из visual studio
git add -A
git commit -m "second commit"
git push 


