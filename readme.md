Команды GIT для консоли

1.  Эта команда создаёт отдельную ветку, которая переводится с английского как «обзорная ветка», а Git сразу переключается на неё.
    git checkout -b 'review-branch'

2.  Выделить все изменения в проекте
    git add -A

3.  Создать коммит
    git commit -m "Дэзэшечка на проверку"

4.  Сама команда для отправки будет немного отличаться: вместо main в ней нужно будет указать название новой обзорной ветки, вот так 👇🏻
    git push origin 'review-branch'

Таким образом, изменения в проекте не коснутся главной ветки, а будут храниться в соседней.

Типы запросов
• GET — получает ресурсы
• POST — создаёт ресурс
• PUT — целиком заменяет существующий ресурс
• PATCH — частично изменяет существующий ресурс
• DELETE — удаляет ресурс