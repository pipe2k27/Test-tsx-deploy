import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  UnderlineType,
  Header,
  Footer,
  ImageRun,
} from "docx";

import soldatiLogo from "./Assets/CompanyLogos/soldati-logo.png";

import toribioAchavalLogo from "./Assets/CompanyLogos/toribio-achaval-logo.png";

import flechaBusLogo from "./Assets/CompanyLogos/flecha-bus-logo.png";

let font = "Arial";
let titleSize = 50;
let textSize = 50;
let lineSpacing = 470;
let marginRight = 780;
let marginLeft = 780;
let footer = new Footer({
  children: [
    new Paragraph({
      spacing: {
        before: 300,
        after: 100,
      },
      alignment: AlignmentType.CENTER,
      children: [],
    }),
  ],
});

let header = new Header({
  children: [
    new Paragraph({
      spacing: {
        before: 300,
        after: 100,
      },
      alignment: AlignmentType.RIGHT,
      children: [],
    }),
  ],
});

const stylesPerCompany = {
  soldati: {
    font: "Arial",
    titleSize: 21,
    textSize: 21,
    lineSpacing: 470,
    marginRight: 780,
    marginLeft: 780,
    footer: new Footer({
      children: [
        new Paragraph({
          spacing: {
            before: 300,
            after: 0,
          },
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: "MERCADO RESIDENCIAL – EMPRENDIMIENTOS E INVERSIONES – MERCADO INTERNACIONAL",
              size: 13,
              font: "Arial",
            }),
          ],
        }),
        new Paragraph({
          spacing: {
            before: 60,
            after: 200,
          },
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: "soldati.com / documento creado en andesdocs.com",
              size: 15,
              font: "Arial",
            }),
          ],
        }),
      ],
    }),
    header: new Header({
      children: [
        new Paragraph({
          spacing: {
            before: 0,
            after: 550,
          },
          alignment: AlignmentType.RIGHT,
          children: [
            new ImageRun({
              data: soldatiLogo,
              transformation: {
                width: 100.69,
                height: 43,
              },
            }),
          ],
        }),
      ],
    }),
  },
  toribioAchaval: {
    font: "Arial",
    titleSize: 21,
    textSize: 21,
    lineSpacing: 470,
    marginRight: 780,
    marginLeft: 780,
    footer: new Footer({
      children: [
        new Paragraph({
          spacing: {
            before: 300,
            after: 0,
          },
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: "Toribio Achával",
              size: 13,
              font: "Arial",
            }),
          ],
        }),
        new Paragraph({
          spacing: {
            before: 60,
            after: 200,
          },
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: "Documento creado en andesdocs.com",
              size: 15,
              font: "Arial",
            }),
          ],
        }),
      ],
    }),
    header: new Header({
      children: [
        new Paragraph({
          spacing: {
            before: 0,
            after: 550,
          },
          alignment: AlignmentType.RIGHT,
          children: [
            new ImageRun({
              data: toribioAchavalLogo,
              transformation: {
                width: 100.69,
                height: 43,
              },
            }),
          ],
        }),
      ],
    }),
  },
  flechaBus: {
    font: "Times New Roman",
    titleSize: 25,
    textSize: 21,
    lineSpacing: 440,
    marginRight: 880,
    marginLeft: 880,
    header: new Header({
      children: [
        new Paragraph({
          spacing: {
            before: 0,
            after: 550,
          },
          alignment: AlignmentType.RIGHT,
          children: [
            new ImageRun({
              data: flechaBusLogo,
              transformation: {
                width: 100.69,
                height: 43,
              },
            }),
          ],
        }),
      ],
    }),
  },
};

export default null;

export const interpolateAnswers = (
  document,
  answers,
  companyName = null,
  removeHeaderAndFooter = false
) => {
  if (
    companyName &&
    (companyName === "soldati" ||
      companyName === "toribioAchaval" ||
      companyName === "flechaBus")
  ) {
    font = stylesPerCompany[companyName].font;
    titleSize = stylesPerCompany[companyName].titleSize;
    textSize = stylesPerCompany[companyName].textSize;
    lineSpacing = stylesPerCompany[companyName].lineSpacing;
    marginRight = stylesPerCompany[companyName].marginRight;
    marginLeft = stylesPerCompany[companyName].marginLeft;
    if (stylesPerCompany[companyName].footer && !removeHeaderAndFooter) {
      footer = stylesPerCompany[companyName].footer;
    }
    if (stylesPerCompany[companyName].header && !removeHeaderAndFooter) {
      header = stylesPerCompany[companyName].header;
    }
  }

  const interpolatedArray = document.map((e) => {
    // this constant will be turned to true if the whole paragrapgh needs to be removed
    let removed = false;
    // this constant will be the paragraph that is returned inside
    // the Text component
    //
    const paragraph = e.map((textObject) => {
      const oldObject = textObject;
      //
      // We use a try catch so that if there is Any answers misisng
      // the code wont break and will just remove the paragraph
      //
      try {
        //
        let text;
        //
        // This eval line is crucial as it will interpolate the
        // answers with paragrphs
        //
        if (textObject.stopRemoval) {
          try {
            text = eval("`" + textObject.text + "`");
          } catch {
            text = "";
          }
        } else {
          text = eval("`" + textObject.text + "`");
        }
        //
        //
        // this will check if the answer is a text array and will iterate over it
        //
        //
        //
        if (textObject.type === "textArray") {
          const oldText = text;
          const arraySpreaded = answers[textObject.question.section][
            textObject.question.number
          ].answer
            .join(", ")
            .toLowerCase();
          if (arraySpreaded.trim() === "") {
            text = "";
            if (!textObject.stopRemoval || textObject.stopRemoval === false) {
              removed = true;
            }
          } else {
            text = oldText.replace("{{array}}", arraySpreaded);
          }
        }
        //
        //
        //
        //
        //

        if (
          textObject.depend &&
          textObject.question.answer !==
            answers[textObject.question.section][textObject.question.number]
              .answer
        ) {
          text = "";
          // this will remove the whole praragraph unless specified
          if (!textObject.stopRemoval || textObject.stopRemoval === false) {
            removed = true;
          }
        }
        //
        //
        //
        //
        //
        //

        // this checks wheteher the sentence or text depends on not beign specific answer
        //and if it does and that answer is  what it needs not to be it removes it
        //
        //
        //
        //
        //
        //

        if (
          textObject.notBe &&
          textObject.question.answer ===
            answers[textObject.question.section][textObject.question.number]
              .answer
        ) {
          text = "";
          if (!textObject.stopRemoval || textObject.stopRemoval === false) {
            removed = true;
          }
        }
        //
        //
        //
        //
        //
        //
        //
        //

        // this will check wether there is any matches on multiple options selections
        //INCLUDES
        //
        //
        if (textObject.includes && !textObject.notInclude) {
          const includedAnswers = textObject.includes.map((e) => {
            if (
              // this line will check if the answer is an array so that it can iterate it
              Array.isArray(
                answers[textObject.question.section][textObject.question.number]
                  .answer
              )
            ) {
              // here we check if the array of answers contains the specified answer
              return answers[textObject.question.section][
                textObject.question.number
              ].answer.includes(e);
            }
          });
          // if any of the answers isnt found it will return a false
          //which will indicate that we shall remove the text
          if (includedAnswers.includes(false)) {
            text = "";
            if (!textObject.stopRemoval || textObject.stopRemoval === false) {
              removed = true;
            }
          }
        }
        //
        //
        //
        //
        //
        //
        //
        //
        // This will check wether there are any answers that should NOT
        // be included to include the text into the document
        //
        //
        //
        if (textObject.notInclude && !textObject.includes) {
          const notIncludedAnswers = textObject.notInclude.map((e) => {
            if (
              // this line will check if the answer is an array so that it can iterate it
              Array.isArray(
                answers[textObject.question.section][textObject.question.number]
                  .answer
              )
            ) {
              // here we check if the array of answers contains the specified answer
              return !answers[textObject.question.section][
                textObject.question.number
              ].answer.includes(e);
            }
          });
          // if any of the answers isnt found it will return a false
          //which will indicate that we shall remove the text
          if (notIncludedAnswers.includes(false)) {
            text = "";
            if (!textObject.stopRemoval || textObject.stopRemoval === false) {
              removed = true;
            }
          }
        }
        //
        //
        //
        //
        //
        //
        // This will check cases for BOTH conditions
        //
        //
        //
        //
        //
        if (textObject.notInclude && textObject.includes) {
          const includedAnswers2 = textObject.includes.map((e) => {
            if (
              // this line will check if the answer is an array so that it can iterate it
              Array.isArray(
                answers[textObject.question.section][textObject.question.number]
                  .answer
              )
            ) {
              // here we check if the array of answers contains the specified answer
              return answers[textObject.question.section][
                textObject.question.number
              ].answer.includes(e);
            }
          });
          // if any of the answers isnt found it will return a false
          //which will indicate that we shall remove the text
          if (includedAnswers2.includes(false)) {
            text = "";
            if (!textObject.stopRemoval || textObject.stopRemoval === false) {
              removed = true;
            }
          } else {
            //
            // this is where if the first part of the checking is passed
            // the second will start and check the NOT Included
            const NotIncludedAnswers2 = textObject.notInclude.map((e) => {
              // here we check if the array of answers contains the specified answer
              return !answers[textObject.question.section][
                textObject.question.number
              ].answer.includes(e);
            });
            if (NotIncludedAnswers2.includes(false)) {
              text = "";
              if (!textObject.stopRemoval || textObject.stopRemoval === false) {
                removed = true;
              }
            }
          }
        }
        //
        //
        //
        //
        //
        return {
          ...textObject,
          text: text,
        };
      } catch {
        removed = true;
        return "";
      }
    });
    if (removed) {
      return null;
    }
    return paragraph;
  });

  const arrayWithFilteredNulls = interpolatedArray.filter((e) => {
    return Array.isArray(e);
  });

  const mapped = arrayWithFilteredNulls.map((e) => {
    const arrayOfChildren = e.map((b) => {
      if (typeof b.text === "string") {
        if (b.type === "title") {
          return new TextRun({
            text: b.text,
            bold: true,
            size: titleSize,
            font: font,
            underline: {
              type: UnderlineType.SINGLE,
              color: "000000",
            },
          });
        }
        if (b.type === "bold" || b.type === "subtitle") {
          return new TextRun({
            text: b.text,
            size: textSize,
            bold: true,
            font: font,
          });
        }
        if (b.type === "boldRight") {
          return new TextRun({
            text: b.text,
            size: textSize,
            bold: true,
            font: font,
          });
        }
        if (b.type === "bullet") {
          return new TextRun({
            text: `${b.bullet} ${b.text}`,
            size: textSize,
            bullet: true,
            font: font,
          });
        }
        return new TextRun({
          text: b.text,
          size: textSize,
          font: font,
        });
      } else {
        return new TextRun("");
      }
    });

    const indent = e[0].bullet ? 720 : 0;
    let align =
      e[0].type === "title" ? AlignmentType.CENTER : AlignmentType.JUSTIFIED;

    if (e[0].type === "boldRight") {
      align = AlignmentType.RIGHT;
    }

    return new Paragraph({
      children: [...arrayOfChildren],
      spacing: {
        before: 300,
        line: lineSpacing,
      },
      indent: {
        left: indent,
      },
      alignment: align,
    });
  });

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 0,
              right: marginRight,
              bottom: 0,
              left: marginLeft,
            },
          },
        },
        headers: {
          default: header,
        },
        footers: {
          default: footer,
        },
        children: [...mapped],
      },
    ],
  });

  return doc;
};
