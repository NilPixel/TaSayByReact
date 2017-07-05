/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { PureComponent } from 'react';
import {
    AppRegistry,
    StyleSheet,
    FlatList,
    View,
    Dimensions
} from 'react-native';

import getData from "./getData";
// import Cell from "./Cell";
import ArticleCell from './ArticleCell';
// import DataSource from "./DataSource";

var cellHei = Dimensions.get('window').width * 360 / 750 + 80;

export default class FateListComponent extends PureComponent {
  state = {
    listData:[],
      refreshing:false,
      loading:true
  };

  _curPage = 1;
  _lastPage = false;

  _fetchNewTenData = () => {
      var url = 'https://aliuat.memedai.cn/cms-portal-web/document/list';
      fetch(url,{
          method:'POST',
          headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body:JSON.stringify({
              pageNo:this._curPage,
              pageSize:10
          })
      }).then((response) => response.json())
          .then((responseJson) => {
            var documentList = responseJson.content.documentList;
            if (documentList){
                var curIdx = this._curPage;
                this._curPage++;
                this._lastPage = (documentList.length < 10);
                if (curIdx == 1){
                    this.setState({
                        loading:false,
                        refreshing:false,
                        listData:documentList,
                    });
                } else {
                    this.setState({
                        loading:false,
                        refreshing:false,
                        listData:this.state.listData.concat(documentList),
                    });
                }
            }else {
                this.setState({
                    refreshing: false,
                    loading: false
                });
            }
          })
          .done();
  };

  _onRefresh = () => {
      if(this.state.loading || this.state.refreshing){
          return;
      }

      this._curPage = 1;
      this._lastPage = false;

      //setState中的属性需要在走完生命周期后才会变化
      this.setState({
          loading:true,
          refreshing:true,
      });

      this._fetchNewTenData();
  };

  _onReachEnd = () => {
      if(this.state.loading || this.state.refreshing || this._lastPage){
          return;
      }

      this.setState({
          loading:true,
      });

      this._fetchNewTenData();
  };

  _renderItem = ({item,index}) => (
    <ArticleCell data={item}/>
  );

  _keyExtractor = (item, index) => index;

    componentDidMount(){
        this._fetchNewTenData();
    }

  render() {
    return (
      <FlatList style={styles.container} initialNumToRender={1}
       data = {this.state.listData} onRefresh = {this._onRefresh}
                refreshing={this.state.refreshing}
       renderItem={this._renderItem}
       onEndReached={this._onReachEnd}
       keyExtractor={this._keyExtractor}
       getItemLayout= {(data,index) => (
          {length: cellHei, offset:(cellHei + 8) * index, index}
        )}
       ItemSeparatorComponent={() => (<View style={{height:8,backgroundColor:'#f5f5f5'}} />)} />
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
