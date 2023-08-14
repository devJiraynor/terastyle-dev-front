import React, { useState, ChangeEvent } from 'react';
import './style.css';
import { teraTypeMenu } from '../../constants';

export default function Home() {

  //          state          //
  // description: 검색어 상태 //
  const [searchWord, setSearchWord] = useState<string>('');
  // description: 테라스탈 타입 버튼 클릭 상태 //
  const [dropClick, setDropClick] = useState<boolean>(false);
  // description: 테라스탈 타입 버튼 클릭 상태 //
  const [autoCompleteList, setAutoCompleteList] = useState<string[]>([]);
  
  //          function          //
  
  //          event handler          //
  // description: 입력값 변경 이벤트 //
  const onSearchWordChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
  }
  // description: 입력값 변경 이벤트 //
  const onDropClickEvent = () => {
    setDropClick(!dropClick);
  }

  //          component          //
  
  const DropDownState = () => {
    //          state          // 
    //          function          //
    //          event handler          //
    //          component          //
    interface MenuItemProps {
      icon: string;
      color: string;
      text: string;
    }

    const MenuItem = ({ icon, color, text }: MenuItemProps) => {
      return (
        <div className='main-type-menu-item'>
          <div className={icon}></div>
          <div className='type-text-icon' style={{ backgroundColor: color }}>{text}</div>
        </div>
      )
    }
    //          effect          //
    //          render          //
    return (
      <div className='main-search-type'>
        <div className='main-search-type-logo-default-icon background-setting'></div>
        <div className='main-search-type-logo-default-text' style={{ color: '#ffffff' }}>테라스탈 타입</div>
        <div className='drop-icon-up background-setting' style={{ marginRight: '16px' }} onClick={onDropClickEvent}></div>
        <div className='main-type-menu'>
          <div className='main-type-menu-container'>
            {teraTypeMenu.map(item => <MenuItem icon={item.icon} color={item.color} text={item.text} />)}
          </div>
        </div>
      </div>
    )
  }

  const DropUpState = () => {
    return (
      <div className='main-search-type'>
        <div className='main-search-type-logo-default-icon background-setting'></div>
        <div className='main-search-type-logo-default-text'>테라스탈 타입</div>
        <div className='drop-icon-down background-setting' style={{ marginRight: '16px' }} onClick={onDropClickEvent}></div>
      </div>
    )
  }

  //          effect          //
  
  //          render          //
  return (
    <div id="home">
        {/* // TODO: 메인 로고 이미지 선택시 해당 포켓몬으로 검색되게 */}
        <div className='main-logo-image background-setting'></div>
        <div className='main-logo-text background-setting'></div>
        <div className='main-search-container' style={{ borderRadius: `54px 54px ${autoCompleteList.length !== 0 ? '0px' : '54px'} ${dropClick ? '0px' : '54px'}` }}>
            {dropClick ? <DropDownState /> : <DropUpState />}
            <div className='divider'></div>
            <div className='main-search-input-box'>
                <input className='main-search-input' placeholder='포켓몬 이름을 입력해주세요.' value={searchWord} onChange={onSearchWordChangeEvent} />
                { searchWord !== '' && <div className='close-round-duotone-icon background-setting'></div> }
                { autoCompleteList.length !== 0 && (
                  <div className='search-auto-completion-box'>

                  </div>
                )}
                <div className='search-icon background-setting' style={{ marginLeft: '16px' }}></div>
            </div>
        </div>
        <div className='main-ads-area'>
            <div className='sample-ads background-setting'></div>
        </div>
    </div>
  )
}
