import React, {PureComponent} from "react";
import {View} from "native-base";
import ArticleItem from "../../article/components/ArticleItem";

/**
 * result
 */
export default class InformationResult extends PureComponent {

    render() {
        let {list} = this.props.data;
        return (
            <View>
                {list && list.map((data,i) => (
                    <ArticleItem key={i} article={data}/>
                ))}
            </View>
        )
    }
}