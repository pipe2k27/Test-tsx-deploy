export const PagareDoc = [
  [
    {
      type: "title",
      text: "PAGARÉ",
      depend: false,
      stopRemoval: false,
    },
  ],
  [
    {
      type: "boldRight",
      text: "Por",
      depend: false,
    },
  ],
  [
    {
      type: "boldRight",
      text: "Vence el ",
      depend: false,
    },
  ],
  [
    {
      type: "text",
      text: " República Argentina, al",
      depend: true,
      stopRemoval: true,
      question: {
        section: "section1",
        number: 1,
        answer: "Ciudad Autónoma de Buenos Aires",
      },
    },
  ],
];
