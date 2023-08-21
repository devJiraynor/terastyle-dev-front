import React from 'react';
import { useParams } from 'react-router-dom';

//          component: 검색 화면 컴포넌트           //
export default function Search() {
  //          state: pocketmon name path parameter 상태          // 
  const { searchPocketmonName } = useParams();

  //          variable          //
  //          function          //
  //          event handler          //
  //          component          //
  //          effect          //
  //          render: 검색 화면 컴포넌트 렌더링          //
  return (
    <div style={{ color: 'white' }}>{ searchPocketmonName }</div>
  )
}
