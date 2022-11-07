/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { DropDownItemStyle, DropDownListContainer, DropDownSelectedStyle } from "./index.style";

interface customDropDownTypes{
  dropdownName: Array<string>;
  dropdownId: Array<number>;
  onClickHandler: (args: number) => void;
}

export const CustomDropDown = (props: customDropDownTypes)  => {
    const [displayDropDown, setDisplayDropDown] = useState(false);
    const [displayedText, setDisplayedText] = useState(props.dropdownName[0])

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