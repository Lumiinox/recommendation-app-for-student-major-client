/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { DropDownItemStyle, DropDownListContainer, DropDownSelectedStyle } from "./index.style";

interface customDropDownTypes{
  dropdownName: Array<string>;
  dropdownId: Array<number>;
  preSelectedIndex?: number;
  onClickHandler: (args: number) => void;
}

export const CustomDropDown = (props: customDropDownTypes)  => {
    const [displayDropDown, setDisplayDropDown] = useState(false);
    const [displayedText, setDisplayedText] = useState('')

    useEffect(() => {
      setDisplayedText(props.dropdownName[0]);
      if (props.preSelectedIndex){
        setDisplayedText(props.dropdownName[props.preSelectedIndex]);
        props.onClickHandler(props.dropdownId[props.preSelectedIndex]);
      }
    }, [props, props.dropdownName, props.preSelectedIndex])
    
    const dropDownClickHandler = (catName: string, catId: number) => {
      setDisplayedText(catName);
      props.onClickHandler(catId);
      setDisplayDropDown(false);
      console.log(catName);
      console.log(catId);
      console.log(displayedText);
    }

    return(
      <div>
        <div css={DropDownSelectedStyle} onClick={() => setDisplayDropDown(!displayDropDown)}>  
          {displayedText}
        </div>

        {displayDropDown && 
          <div css={DropDownListContainer}>
            {props.dropdownName.map((data, index) => {
                return (
                  <div css={DropDownItemStyle} key={index} onClick={() => dropDownClickHandler(data, props.dropdownId[index])}>
                    {index+1}. {data}  
                  </div>
                )
              })
            }
          </div>
        }
      </div>
    )
  }