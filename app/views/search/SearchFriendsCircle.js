import React, {PureComponent} from "react";
import {Container, Content, SearchHeader} from "../../components/index";
import Header from "../../components/header/SearchHeader";

/**
 * 搜索 -> 朋友圈
 */
export default class SearchFriendsCircle extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Container>
                <SearchHeader placeholder="搜索朋友圈" />
                <Content white>
                </Content>
            </Container>
        );
    }
}