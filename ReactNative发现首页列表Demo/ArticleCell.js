/**
 * Created by songzhanglong on 2017/6/23.
 */


import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';

export default class ArticleCell extends Component{
    constructor(props){
        super(props);
    }

    //不足2位补0
    _foo = (str) => {
        var newStr = '00' + str;
        return newStr.substring(newStr.length - 2,newStr.length);
    }

    //图片渲染
    _renderVideoImage = () => {
        if (this.props.data.displayType == 'video'){
            var timeLength;
            var timeDistance = parseInt(this.props.data.costTime);
            var minute = parseFloat(timeDistance) / 60;
            if (minute < 60){
                var second = timeDistance % 60;
                timeLength = this._foo(parseInt(minute)) + ':' + this._foo(second);
            } else {
                var hour = parseInt(minute / 60),newMinute = parseInt(minute - hour * 60);
                timeLength = this._foo(hour) + ':' + this._foo(newMinute);
            }
            return (
                <View style={styles.viewPlay}>
                    <Image style={styles.imgPlay} source={require('./Images/ArticlePlay.png')}/>
                    <Text style={styles.textPlay}>{timeLength}</Text>
                </View>

            );
        }
    };

    //数量计算
    _renderFavoriteNumber = (number) => {
        if (number < 10000){
            return number;
        } else if (number < 100000){
            var lastNum = parseFloat(number) / 10000;
            return ('' + lastNum).substring(0,2) + '万';
        }

        return '10万＋';
    };

    //时间计算
    _calculateTimeDistance = (publishTime) => {
        var curDate = new Date();
        //单位s
        var timeInterval = Math.abs(Math.floor(publishTime - curDate.getTime())) / 1000;
        if (timeInterval < 60){
            return '刚刚';
        }

        timeInterval = timeInterval / 60;
        if (timeInterval < 60) {
            //1-59分钟
            return parseInt(timeInterval) + '分钟前';
        }

        timeInterval = timeInterval / 60;
        if (timeInterval < 12) {
            //1-11小时
            return parseInt(timeInterval) + '小时前';
        }

        if (timeInterval < 24)
        {
            //12-23小时
            return '半天前';
        }

        timeInterval = timeInterval / 24;
        if (timeInterval < 7) {
            //1-6天
            return parseInt(timeInterval) + '天前';
        }

        timeInterval = timeInterval / 7;
        if (timeInterval < 22) {
            //1-3周显示几周前
            return parseInt(timeInterval) + '周前';
        }

        var timeStr = '';
        //有可能22天以上，1月以下
        timeInterval = Math.max(timeInterval / 30, 1);
        if (timeInterval < 12) {
            timeStr = parseInt(timeInterval) + '个月前';
        } else {
            timeStr = new Date(publishTime).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ").substring(0,7);
        }

        return timeStr;
    };

    render(){
        var {thumbnailUrl,title} = this.props.data;
        return (
            <View style={styles.container}>
                <Image style={styles.imgStyle} resizeMode={Image.resizeMode.cover} source={{uri:thumbnailUrl}}>
                    {this._renderVideoImage()}
                </Image>
                <Text numberOfLines={1} style={styles.title}>
                    {title}
                </Text>
                <View style={styles.marginView}/>
                <View style={styles.rowView}>
                    <Text style={styles.timeLabel}>{this._calculateTimeDistance(parseFloat(this.props.data.displayTime))}</Text>
                    <View style={styles.rowNullView}/>
                    <TouchableOpacity activeOpacity={0.5} style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={styles.numberLab}>{this._renderFavoriteNumber(parseInt(this.props.data.favoriteNumber))}</Text>
                        <Image style={styles.collectImg}
                               source={(this.props.data.isFavorite == '1') ? require('./Images/praiseHlight.png') : require('./Images/praiseNormal.png')}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        height:Dimensions.get('window').width * 360 / 750 + 80,
        backgroundColor:'white',
        flexDirection:'column'
    },
    imgStyle:{
        flexDirection:'column',
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').width * 360 / 750,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'lightgray'
    },
    viewPlay:{
        flexDirection:'column'
    },
    imgPlay:{
        width:64,
        height:64
    },
    textPlay:{
        color:'#FFFFFF',
        marginTop:5,
        fontSize:10,
        textAlign:'center',
        backgroundColor:'transparent'
    },
    title:{
        color:'#1A2833',
        fontSize:14,
        marginLeft:13,
        marginTop:16
    },
    marginView:{
        width:20,
        height:1,
        backgroundColor:'#EAEAEA',
        marginLeft:13,
        marginTop:7.5
    },
    rowView:{
        marginTop:2.5,
        flexDirection:'row',
        paddingHorizontal:13,
        height:20,
        width:Dimensions.get('window').width,
        alignItems:'center'
    },
    timeLabel:{
        color:'#A6AFB5',
        fontSize:10
    },
    rowNullView:{
        flex:1
    },
    numberLab:{
        color:'#1A2833',
        fontSize:12,
        marginRight:5
    },
    collectImg:{
        width:20,
        height:20
    }
});