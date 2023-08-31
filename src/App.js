
import React, { useEffect, useRef } from 'react';
import Handsontable from 'handsontable';
import 'handsontable/dist/handsontable.full.min.css';
import 'handsontable/languages/zh-CN';

const App = () => {
  const containerRef = useRef(null);
  const hotRef = useRef(null);
  const containerBRef = useRef(null);
  const hotBRef = useRef(null);

  useEffect(() => {
    const container = containerRef?.current;

    if (!hotRef.current) {
      const data = [
        ['2017-01', '上海', '2023-3-1', '大床', '是',3444],
        ['2017-01', '上海', '2023-3-1', '双床', '是',3445],
        ['2017-01', '上海', '2023-3-1', '商务', '是',3446],
        ['2017-01', '上海', '2023-3-2', '大床', '否',3447],
        ['2017-01', '上海', '2023-3-2', '双床', '是',3448],
        ['2017-02', '重庆', '2023-3-5', '商务', '是',3449],
        ['2017-02', '重庆', '2023-3-5', '大床', '否',3556],
        ['2017-02', '重庆', '2023-3-6', '双床', '是',3557],
        ['2017-02', '重庆', '2023-3-6', '商务', '是',3558]
    ];
  
      hotRef.current = new Handsontable(container, {
        data: data,
        colHeaders: ['酒店代码', '酒店地址', '入住时间', '房型', '是否含税费','价格'], // 使用自定义列头
        colWidths: 150, // 列宽 忽略
        // rowHeights: [47, 34, 34],//忽略
        rowHeaders: true,
        height: 'auto',
        licenseKey: 'non-commercial-and-evaluation',// for non-commercial use only
        // contextMenu: [
        //   'col_left',
        //   'col_right',
        //   'remove_col',
        //   'mergeCells' //合并了
        // ],
        contextMenu:true, // 菜单
        language: 'zh-CN', // 语言
        mergeCells: [
          { row: 0, col: 0, rowspan: 5, colspan: 1 },
          { row: 0, col: 1, rowspan: 5, colspan: 1 },
          { row: 0, col: 2, rowspan: 3, colspan: 1 },
          { row: 3, col: 2, rowspan: 2, colspan: 1 },
          { row: 5, col: 0, rowspan: 4, colspan: 1 },
          { row: 5, col: 1, rowspan: 4, colspan: 1 },
          { row: 5, col: 2, rowspan: 2, colspan: 1 },
          { row: 7, col: 2, rowspan: 2, colspan: 1 },
  
        ],
        cell: [
          { row: 0, col: 0, className: "htCenter htMiddle" }, // 设置下标为0,0的单元格样式 水平居中、垂直居中
          { row: 5, col: 0, className: "htCenter htMiddle" }
        ],
        afterChange: (changes, source) => {
          // changes: An array of changes in the format [row, prop, oldValue, newValue].
          // source: The source of the change, can be one of: 'alter', 'empty', 'edit', 'populateFromArray', 'loadData', 'autofill', 'paste'.
          console.log('Data changed:', changes);
          console.log('source',source);
        },
      });
    }
    

    return () => {
      if (hotRef.current) {
        hotRef.current.destroy();
        hotRef.current = null;
      }
    };
  }, []);
  useEffect(() => {
    const container = containerBRef?.current;

    if (!hotBRef.current) {
      const data = [
        ['2017-01', '上海', '2023-3-1', '大床', '是',1234],
        ['', '', '', '双床', '是',1235],
        ['', '', '', '商务', '是',1236],
        ['', '', '2023-3-2', '大床', '否',1237],
        ['', '', '', '双床', '是',1238],
        ['2017-02', '重庆', '2023-3-5', '商务', '是',1239],
        ['', '', '', '大床', '否',1231],
        ['', '', '2023-3-6', '双床', '是',1232],
        ['', '', '', '商务', '是',1233]
    ];

      hotBRef.current = new Handsontable(container, {
        data: data,
        colHeaders: ['酒店代码', '酒店地址', '入住时间', '房型', '是否含税费','价格'],
        colWidths: 150,
        rowHeaders: true,
        height: 'auto',
        licenseKey: 'non-commercial-and-evaluation',
        contextMenu: true,
        language: 'zh-CN',
        afterChange: (changes, source) => {
          // Data change event (same as example data)
          console.log('Data changed (exampleB):', changes);
          console.log('source (exampleB)', source);
        },
      });
    }

    return () => {
      if (hotBRef.current) {
        hotBRef.current.destroy();
        hotBRef.current = null;
      }
    };
  }, []);
  /**
   * 获取table全部数据
   */
  const handleGetData = () => {
    if (hotRef.current) {
      const data = hotRef.current.getData();
      console.log('Current data:', data);
    }
    if (hotBRef.current) {
      const dataB = hotBRef.current.getData();
      console.log('Current data (exampleB):', dataB);
    }
  };
  return (
    <div className="App">
      demo
      <div ref={containerRef} id="example"></div>
      <div ref={containerBRef} id="exampleB" style={{marginTop:24}}></div>
      <button onClick={handleGetData}>Get Data</button>
    </div>
  );
}

export default App;