import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePocketmonNames } from '../../stores';

//          component: 검색 화면 컴포넌트           //
export default function Search() {
  
  //          state: Search Button Ref 상태          //
  const searchButtonRef = useRef<HTMLDivElement | null>(null);
  //          state: pocketmon name path parameter 상태          // 
  const { searchPocketmonName } = useParams();
  //          state: pocketmon names 상태          // 
  const { pocketmonNames, setPocketmonNames } = usePocketmonNames();
  //          state: 검색어 상태          //
  const [searchWord, setSearchWord] = useState<string>('');
  //          state: 검색 자동완성 상태          //
  const [autoCompleteList, setAutoCompleteList] = useState<string[]>([]);

  //          variable          //
  //          function: 네비게이트 함수          //
  const navigator = useNavigate();
  
  //          event handler: 입력값 변경 이벤트          //
  const onSearchWordChangeEvent = (event: ChangeEvent<HTMLInputElement>) => setSearchWord(event.target.value);

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
  //          component          //
  //          effect: searchPocketmonName 상태 업데이트 시 searchWord 상태 변경          //
  useEffect(() => {
    if (!searchPocketmonName) {
      navigator('/');
      return;
    }
    setSearchWord(searchPocketmonName)
  }, [searchPocketmonName]);
  //          effect: searchWord 상태 업데이트 시 자동 완성 리스트 필터링          //
  useEffect(() => {
    let names = pocketmonNames.filter(pocketmonName => pocketmonName.includes(searchWord) && searchWord !== pocketmonName);
    if (!searchWord) names = [];
    setAutoCompleteList(names);
  }, [searchWord]);
  //          render: 검색 화면 컴포넌트 렌더링          //
  return (
    <div id="search-wrapper">
      <div className='search-header'>
        <div className='search-logo-text background-setting'></div>
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
      <div className='search-container'>

      </div>
      <div className='main-ads-area'>
        <div className='sample-ads background-setting'></div>
      </div>
    </div>
  )
}
