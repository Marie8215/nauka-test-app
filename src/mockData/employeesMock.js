export const employees = [
  { type: "user", name: "Григоропулос Афинский", salary: 1300 },
  { type: "user", name: "Афина Совинская", salary: 1300 },
  {
    type: "group",
    name: "Отдел тестирования",
    childs: [
      { type: "user", name: "Иннокентий", salary: 200 },
      { type: "user", name: "Болик", salary: 300 },
      {
        type: "group",
        name: "Группа веселых ребят",
        childs: [
          { type: "user", name: "Клоунесса", salary: 600 },
          { type: "user", name: "Дрессировщица пользователей", salary: 900 },
        ],
      },
    ],
  },
  {
    type: "group",
    name: "Отдел разработки",
    childs: [{ type: "user", name: "Пермякова Мария", salary: 200 }],
  },
];
