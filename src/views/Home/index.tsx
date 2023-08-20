import React, { useState, ChangeEvent } from 'react';
import './style.css';
import { teraTypeMenu } from '../../constants';
import TeraType from '../../interface/tera-type.interface';

//          component: 홈 화면 컴포넌트          //
export default function Home() {

  //          state: 검색어 상태          //
  const [searchWord, setSearchWord] = useState<string>('');

  //          state: 테라스탈 타입 버튼 클릭 상태          //
  const [dropClick, setDropClick] = useState<boolean>(false);

  //          state: 검색 자동완성 상태          //
  const [autoCompleteList, setAutoCompleteList] = useState<string[]>([]);

  //          state: 선택한 테라스탈 타입 상태          //
  const [selectedType, setSelectedType] = useState<TeraType | null>(null);

  //          variable: 검색창 border-radius class 변수          //
  // TODO: searchWord 로 지정한것 autoCompleteList 길이 0 으로 변경
  const mainSearchContainerClass = dropClick && searchWord ? 'main-search-container-all' : dropClick && !searchWord ? 'main-search-container-type' : !dropClick && searchWord ? 'main-search-container-search' : 'main-search-container';
  
  //          function          //
  
  //          event handler: 입력값 변경 이벤트          //
  const onSearchWordChangeEvent = (event: ChangeEvent<HTMLInputElement>) => setSearchWord(event.target.value);

  //          event handler: 드랍다운 버튼 클릭 이벤트          //
  const onDropClickEvent = () => setDropClick(!dropClick);

  //          event handler: 타입 메뉴 클릭 이벤트          //
  const onTypeClickEvent = (teraType: TeraType) => {
    setSelectedType(teraType);
    setDropClick(false);
  }
  //          event handler: 검색어 리셋 클릭 이벤트          //
  const onResetButtonClinckHandler = () => setSearchWord('');

  //          interface: 타입 메뉴 아이템 컴포턴트 Properties          //
  interface MenuItemProps {
    icon: string;
    color: string;
    text: string;
  }
  //          component: 타입 메뉴 아이템 컴포넌트         //
  const MenuItem = (props: MenuItemProps) => {
    const { icon, color, text } = props;
    return (
      <div className='main-type-menu-item' onClick={() => onTypeClickEvent(props)}>
        <div className={icon}></div>
        <div className='type-text-icon' style={{ backgroundColor: color }}>{text}</div>
      </div>
    )
  }
  //          component: 타입 드롭다운 클릭시 컴포넌트           //
  const DropDownState = () => {
    //          state          // 
    //          function          //
    //          event handler          //
    //          component          //
    //          effect          //
    //          render: 타입 드롭다운 클릭시 컴포넌트 렌더링          //
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
  //          component: 타입 선택창 컴포넌트           //
  const DropUpState = () => {
    //          render: 타입 선택창 컴포넌트 렌더링          //
    return (
      <div className='main-search-type'>
        {selectedType ? (
          <>
            <div className={selectedType.icon}></div>
            <div className='main-selected-type'>
              <div className='type-text-icon' style={{ backgroundColor: selectedType.color, marginLeft: '0px' }}>{selectedType.text}</div>
            </div>
            <div className='drop-icon-down background-setting' style={{ marginRight: '16px' }} onClick={onDropClickEvent}></div>
          </>
        ) : (
          <>
            <div className='main-search-type-logo-default-icon background-setting'></div>
            <div className='main-search-type-logo-default-text'>테라스탈 타입</div>
            <div className='drop-icon-down background-setting' style={{ marginRight: '16px' }} onClick={onDropClickEvent}></div>
          </>
        )}
      </div>
    )
  }

  //          effect          //
  
  //          render: 홈 화면 컴포넌트 렌더링          //
  return (
    <div id="home">
        {/* // TODO: 메인 로고 이미지 선택시 해당 포켓몬으로 검색되게 */}
        <div className='main-logo-image background-setting'></div>
        <div className='main-logo-text background-setting'></div>
        <div className={mainSearchContainerClass}>
            {dropClick ? <DropDownState /> : <DropUpState />}
            <div className='divider'></div>
            <div className='main-search-input-box'>
                <input className='main-search-input' placeholder='포켓몬 이름을 입력해주세요.' value={searchWord} onChange={onSearchWordChangeEvent} />
                { searchWord !== '' && <div className='close-round-duotone-icon background-setting' onClick={onResetButtonClinckHandler}></div> }
                { /* autoCompleteList.length === 0 */ searchWord !== '' && (
                  <div className='search-auto-completion-box'>
                    <div className='search-auto-completion-container'>
                      <div className='search-auto-completion-item'>리리코</div>
                      <div className='search-auto-completion-item'>리리코</div>
                      <div className='search-auto-completion-item'>리리코</div>
                      <div className='search-auto-completion-item'>리리코</div>
                      <div className='search-auto-completion-item'>리리코</div>
                      <div className='search-auto-completion-item'>리리코</div>
                      <div className='search-auto-completion-item'>리리코</div>
                      <div className='search-auto-completion-item'>리리코</div>
                      <div className='search-auto-completion-item'>리리코</div>
                      <div className='search-auto-completion-item'>리리코</div>
                      <div className='search-auto-completion-item'>리리코</div>
                      <div className='search-auto-completion-item'>리리코</div>
                      <div className='search-auto-completion-item'>리리코</div>
                      <div className='search-auto-completion-item'>리리코</div>
                    </div>
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
