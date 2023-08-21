import React, { useState, ChangeEvent, useEffect, useRef, KeyboardEvent } from 'react';
import './style.css';
import { teraTypeMenu } from '../../constants';
import TeraType from '../../interface/tera-type.interface';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

//          component: 홈 화면 컴포넌트          //
export default function Home() {

  //          state: Search Button Ref 상태          //
  const searchButtonRef = useRef<HTMLDivElement | null>(null);

  //          state: 포켓몬 이름 리스트 상태          //
  const [pocketmonNames, setPocketmonNames] = useState<string[]>([]);

  //          state: 검색어 상태          //
  const [searchWord, setSearchWord] = useState<string>('');

  //          state: 테라스탈 타입 버튼 클릭 상태          //
  const [dropClick, setDropClick] = useState<boolean>(false);

  //          state: 검색 자동완성 상태          //
  const [autoCompleteList, setAutoCompleteList] = useState<string[]>([]);

  //          state: 선택한 테라스탈 타입 상태          //
  const [selectedType, setSelectedType] = useState<TeraType | null>(null);

  //          variable: 검색창 border-radius class 변수          //
  const mainSearchContainerClass = dropClick && autoCompleteList.length ? 'main-search-container-all' : dropClick && !autoCompleteList.length ? 'main-search-container-type' : !dropClick && autoCompleteList.length ? 'main-search-container-search' : 'main-search-container';
  
  //          function: 네비게이트 함수          //
  const navigator = useNavigate();
  
  //          event handler: 입력값 변경 이벤트          //
  const onSearchWordChangeEvent = (event: ChangeEvent<HTMLInputElement>) => setSearchWord(event.target.value);

  //          event handler: 드랍다운 버튼 클릭 이벤트          //
  const onDropClickEvent = () => setDropClick(!dropClick);

  //          event handler: 타입 메뉴 아이템 클릭 이벤트          //
  const onTypeClickEvent = (teraType: TeraType) => {
    setSelectedType(teraType);
    setDropClick(false);
  }

  //          event handler: 자동완성 메뉴 아이템 클릭 이벤트          //
  const onAutoCompliteItemClickHandler = (name: string) => setSearchWord(name);

  //          event handler: 검색어 리셋 클릭 이벤트          //
  const onResetButtonClinckHandler = () => setSearchWord('');

  //          event handler: 검색 버튼 클릭 이벤트          //
  const onSearchButtonClickHandler = () => navigator(`/search/${searchWord}`);

  //          event handler: 검색 인풋 엔터 이벤트          //
  const onSearchInputEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    if (!searchButtonRef.current) return;
    searchButtonRef.current.click();
  }

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

  //          effect: 컴포넌트 마운트 시 포켓몬 이름 리스트 불러오기          //
  useEffect(() => {
    axios.get('http://localhost:4000/pocketmon/pocketmon-names')
      .then(response => setPocketmonNames(response.data))
      .catch(error => setPocketmonNames(['이상해씨', '이상해풀', '이상해꽃', '파이리', '리자드', '리자몽', '꼬부기', '어니부기', '거북왕']));
  }, []);
  //          effect: searchWord 상태 업데이트 시 자동 완성 리스트 필터링          //
  useEffect(() => {
    let names = pocketmonNames.filter(pocketmonName => pocketmonName.includes(searchWord) && searchWord !== pocketmonName);
    if (!searchWord) names = [];
    setAutoCompleteList(names);
  }, [searchWord]);
  
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
                <input className='main-search-input' placeholder='포켓몬 이름을 입력해주세요.' value={searchWord} onChange={onSearchWordChangeEvent} onKeyDown={onSearchInputEnterHandler} />
                { searchWord !== '' && <div className='close-round-duotone-icon background-setting' onClick={onResetButtonClinckHandler}></div> }
                { autoCompleteList.length !== 0 && (
                  <div className='search-auto-completion-box'>
                    <div className='search-auto-completion-container'>
                      {autoCompleteList.map(name => <div className='search-auto-completion-item' onClick={() => onAutoCompliteItemClickHandler(name)}>{name}</div>)}
                    </div>
                  </div>
                )}
                <div ref={searchButtonRef} className='search-icon background-setting' style={{ marginLeft: '16px' }} onClick={onSearchButtonClickHandler}></div>
            </div>
        </div>
        <div className='main-ads-area'>
            <div className='sample-ads background-setting'></div>
        </div>
    </div>
  )
}
