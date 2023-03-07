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


export default function ThemeBuilder() {
  const { data: session , status } = useSession();
  const { user, setUser } = useUser();
  const { personas, setPersonas } = usePersonas();
  const { theme, setTheme, themeChanges, setThemeChanges} = useTheme();
  const [aspectFocused, setAspectFocused] = useState("")
  const [aspectInputs, setAspectInputs] = useState([]);
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
        classNameCard = "card w-full max-w-xs "
     
        for (const colorAspect in colorAspects) {
          let camelCaseAspect = makeCamelCase(colorAspect)
          let n_match = ntc.name(theme[camelCaseAspect])
         
          let hexColor = theme[camelCaseAspect]
          let hslColor = hexToHSL(hexColor)
          let hslFlipped = flipHSL(hslColor)
          let styleValue = {
            input: {
              "backgroundColor": "hsl(" + hslColor  + ")",
              "color": "hsl(" + hslFlipped + ")"
            }
          }
    
          let key = colorAspect+" "+JSON.stringify(n_match[1])
          textBoxclassName = "input input-bordered w-full max-w-xs"
          result.push(<InputField key={key} id={colorAspect} type="text"
            label={colorAspect} value={n_match[1]} focusFunction={onFocus} focusParameterSet={colorAspect} className={textBoxclassName} styleValue={styleValue}>

          </InputField>)
        }
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

        <div className="card card-side bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              <InputField key="themeName" id="themeName" type="text"
                label="Theme" value={theme.name} className="input input-bordered w-full max-w-xs"> //TODO: Add language support?
              </InputField>
            </h2>
            <form id="colorsToSet">
              <div className="grid grid-cols-3 grid-flow-row">
                {aspectInputs.map(function (result, x) {
                  let a = colors[result[0].key]
                  let classNameCard = "card card-side bg-base-100 shadow-xl " //+ classNamesCard[x]
                  return (
                    <div key={x} className={classNameCard}>
                      <div className="card-body" > {result} </div>
                    </div>
                  )
                })}
              </div>
            </form>
          </div>

          <ColorPicker aspect={aspectFocused} color={colorHex} onColorChange={onColorChange}></ColorPicker>
        </div>
      </>
    )
  } else { return <></> }

  async function onColorChange(color, aspectFocused) {
    if (theme && aspectFocused) {
      let n_match = ntc.name(color.hexString)
      let colorHsl = hexToHSL(n_match[0])

      let colorUpdate = {}
      colorUpdate[makeCamelCase(aspectFocused)] = n_match[0]
      let newtheme = theme
      newtheme[makeCamelCase(aspectFocused)] = n_match[0]
      setTheme(newtheme)

      let themeCreate = {
        themeName: theme.name + " Copy",
        ownerUserId: user.userId
      }
      themeCreate[makeCamelCase(aspectFocused)] = n_match[0]

      try {
        const themeUpdate = await fetch('/api/theme/update?id=' + theme.id, {
          method: "POST",
          body: JSON.stringify(colorUpdate)
        })
      } catch (error) {
        console.log(error);
      }
     
      //document.documentElement.style.setProperty(colorsUnstructured[aspectFocused], colorHsl);
      setThemeChanges(true)
    }
  };

  function onFocus(e, aspect) {
    setAspectFocused(aspect)
  };


  function generateHSLString(color) {
    let hsl = color.hsl.h + " " + color.hsl.s + "% " + color.hsl.l + "%"
    return hsl
  }




}

   /* 
        for (const colorAspect in colorAspects) {
          aspectToSet = pickAspectToSet(colorAspect)
          classNameCard += aspectToSet + "-" + colorAspect + " "
        }

        setClassNamesCard(prev => [...prev, classNameCard]) */