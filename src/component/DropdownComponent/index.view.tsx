/** @jsxImportSource @emotion/react */
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { DropDownItemStyle, DropDownListContainer, DropDownSelectedStyle, DrowDownAngleDown } from "./index.style";

interface customDropDownTypes{
  dropdownName: Array<string>;
  dropdownId: Array<number>;
  preSelectedIndex: number;
  isFilterMode?: boolean;
  onClickHandler: (args: number) => void;
}

export const CustomDropDown = (props: customDropDownTypes)  => {
    const [displayDropDown, setDisplayDropDown] = useState(false);
    const [displayedText, setDisplayedText] = useState('');
    useEffect(() => {
      if (props.preSelectedIndex && props.preSelectedIndex !== -1){
        console.log(props.preSelectedIndex);
        console.log(props.dropdownName[props.preSelectedIndex]);
        setDisplayedText(props.dropdownName[props.preSelectedIndex]);
        props.onClickHandler(props.dropdownId[props.preSelectedIndex]);
      }

    }, [props, props.dropdownName, props.preSelectedIndex]);
    
    useEffect(() => {
      if (props.preSelectedIndex === -1){
        setDisplayedText("None Selected");
      } 
      if (props.isFilterMode){
        setDisplayedText("No Filter");
      }
    }, [props.isFilterMode, props.preSelectedIndex]);

    const dropDownClickHandler = (catName: string, catId: number) => {
      console.log(catName);
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
          <FontAwesomeIcon icon={faAngleDown} css={DrowDownAngleDown}/>
        </div>

        {displayDropDown && 
          <div css={DropDownListContainer}>
            {props.isFilterMode &&             
              <div css={DropDownItemStyle}  onClick={() => dropDownClickHandler("No Filter", 0)}>
                Clear  
              </div>
            }
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