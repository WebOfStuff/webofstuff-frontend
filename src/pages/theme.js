import { useEffect, useRef, useState, useCallback } from 'react';
import ColorPicker from '../components/Base/Colors/ColorPicker';
import ntc from 'ntcjs'
import ColorsDaisyUI, { ColorsDaisyUIUnstructured } from '../components/Base/Colors/ColorsDaisyUI';
import { InputField } from '../components/Base/InputField';
import { useTheme } from '../components/Themes/ThemeContext';
import { makeCamelCase } from '../components/Base/String';
import { useUser } from '../components/User/UserContext';
import { usePersonas } from '../components/Personas/PersonaContext';
import { hexToHSL, flipHSL } from '../components/Base/Colors/Colors';
import { useSession } from 'next-auth/react';
import { hydrateUserDataFunction } from '../components/User/UserChanger';
import { v4 } from "uuid";


export default function ThemeBuilder() {
  const { data: session, status } = useSession();
  const { user, setUser } = useUser();
  const { personas, setPersonas } = usePersonas();
  const { theme, setTheme, themeChanges, setThemeChanges } = useTheme();
  const [aspectFocused, setAspectFocused] = useState("")
  const [aspectInputs, setAspectInputs] = useState([]);
  const [showColorPicker, setShowColorPicker] = useState("hidden");
  const [colorPickerPosition, setColorPickerPosition] = useState([0, 0]);
  const [colorHex, setColorHex] = useState("#AAAAAA");
  const colors = ColorsDaisyUI();
  const colorsUnstructured = ColorsDaisyUIUnstructured();
  const [classNamesCard, setClassNamesCard] = useState([]);
  const [themeToEdit, setThemeToEdit] = useState("");


  const hydrateUserData = useCallback(async () => {
    hydrateUserDataFunction(session, setUser, setPersonas, setTheme)
  },
    [session, setUser, setPersonas, setTheme],
  );

  useEffect(() => {
    if (session && themeChanges) {
      hydrateUserData(session).catch(console.error)
    };
  }, [user, session, hydrateUserData, themeChanges]);

  useEffect(() => {
    if (theme && (themeChanges || theme.themeName != themeToEdit)) {
      setThemeToEdit(theme.themeName) //TODO vllt Wert aus TextInput?
      let classNameCard, textBoxclassName, aspectToSet, styleValue;
      let result = []
      let collectResults = []


      for (const color in colors) {
        let colorAspects = colors[color]
        classNameCard = ""

        for (const colorAspect in colorAspects) {
          let camelCaseAspect = makeCamelCase(colorAspect)
          let n_match, hslColor, hslFlipped;
          if (theme[camelCaseAspect]) {
            n_match = ntc.name(theme[camelCaseAspect])
            let hexColor = theme[camelCaseAspect]
            hslColor = hexToHSL(hexColor)
            hslFlipped = flipHSL(hslColor)
          } else {
            hslColor = "0, 100%, 100%"
            hslFlipped = "0, 100%, 0%"
            n_match = ["Not Set", "Not Set"]
          }

          let styleValue = {
            "backgroundColor": "hsl(" + hslColor + ")",
            "color": "hsl(" + hslFlipped + ")"
          }

          switch (colorAspect) {
            case colorAspect.match(/color/)?.input:
              let toSet = colorAspect.slice(0, -6);
              classNameCard += " bg-" + toSet
              break;
            case colorAspect.match(/content/)?.input:
              classNameCard += " text-" + colorAspect
              break;
          }

          let key = colorAspect + " " + JSON.stringify(n_match[1])
          textBoxclassName = "input input-bordered w-full max-w-xs"
          result.push(<InputField key={key} id={colorAspect} type="text"
            label={colorAspect} value={n_match[1]} focusFunction={onFocus} blurFunction={onBlur} focusParameterSet={colorAspect} className={textBoxclassName} styleValue={styleValue} readOnly="readOnly">

          </InputField>)
        }
        classNamesCard.push(classNameCard)
        collectResults.push(result)
        result = []
      }
      setAspectInputs(collectResults)
      setThemeChanges(false)
    }
  }, [colors, personas, theme, classNamesCard, themeChanges, themeToEdit, setThemeChanges, setClassNamesCard, setAspectInputs]);

  if (theme) {
    return (
      <>
        <div className="card card-bordered bg-base-100 shadow-xl h-full overflow-scroll">
          <div className="card-body h-full ">
            <h2 className="card-title h-1/6">
              <InputField key="themeName" id="themeName" type="text"
                label="Theme" value={themeToEdit.toUpperCase()} className="input input-bordered w-full max-w-xs text-transform: uppercase"> //TODO: Add language support?
              </InputField>
            </h2>
            <form className="h-5/6" id="colorsToSet">
              <div className="flex flex-wrap">
                {aspectInputs.map(function (result, x) {
                  let a = colors[result[0].key]
                  let classNameCard = "card card-bordered min-w-[350px] flex-grow shadow-xl " + classNamesCard[x]
                  return (
                    <div key={x} className={classNameCard}>
                      <div className="card-body " > {result} </div>
                    </div>
                  )
                })}
              </div>
            </form>
          </div>

          <ColorPicker visible={showColorPicker} position={colorPickerPosition} aspect={aspectFocused} color={colorHex} onColorChange={onColorChange} themeName={document.getElementById("themeName")?.value.toUpperCase()} ></ColorPicker>
        </div>
      </>
    )
  } else { return <></> }

  async function onColorChange(color, aspectFocused, themeName) {
    if (theme && aspectFocused) {
      let n_match = ntc.name(color.hexString)
      let colorHsl = hexToHSL(n_match[0])
      let where = { "themeName": themeName }
      let create = JSON.parse(JSON.stringify(theme));
      let update = JSON.parse(JSON.stringify(theme));

      let uuid = v4()
      create.id = uuid;
      create[makeCamelCase(aspectFocused)] = n_match[0]
      create.themeName = themeName;
      create.ownerUserId = user.id
      create["favUserIds"] = { connect: { id: user.id } }
      create["personas"] = {
        connect: {
          id: personas[user.currentPersona].personaId
        }
      }

      delete update.id
      update[makeCamelCase(aspectFocused)] = n_match[0]
      setTheme(update)

      let body = {
        where: where,
        create: create,
        update: update
      }

      try {
        const themeUpdate = await fetch('/api/theme/upsert', {
          method: "POST",
          body: JSON.stringify(body)
        }).then(response => {
          return response.text()
        }).then(text => {
          return text
        })
      } catch (error) {
        console.log(error);
      }

      setThemeChanges(true)
    }
  };

  function onFocus(e, aspect) {
    setShowColorPicker("visible")
    setColorPickerPosition([e.target.getBoundingClientRect().left, e.target.getBoundingClientRect().top + e.target.scrollHeight])
    setColorHex(theme[makeCamelCase(aspect)])
    setAspectFocused(aspect)
  };

  function onBlur(e) {
    setShowColorPicker("hidden")
  };



  function generateHSLString(color) {
    let hsl = color.hsl.h + " " + color.hsl.s + "% " + color.hsl.l + "%"
    return hsl
  }
}
