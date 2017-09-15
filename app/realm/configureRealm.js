'use strict';

import Realm from "realm";
import schema from "./schema";
import uuid from "uuid";
import * as schemaConstants from './schemaConstants'


let init = function (realm) {

    initUser(realm);
    //initChat(realm);

};

let initUser = function (realm) {
    realm.write(() => {

        let allUsers = realm.objects('User');
        realm.delete(allUsers);

        realm.create('User', {
            id: 'yangkk',
            username: 'yangkk',
            password: '',
            name: '杨可可',
            sex: '男',
            photo: 'path',
            phone: '15901097191',
            createTime: new Date()
        });

        // realm.create('User', {
        //     id: 'wangp',
        //     username: 'wangp',
        //     name: '王鹏',
        //     sex: '男',
        //     createTime: new Date()
        // });
        //
        // realm.create('User', {
        //     id: 'guoxm',
        //     username: 'guoxm',
        //     name: '郭晓敏',
        //     sex: '女',
        //     createTime: new Date()
        // });
    });
};

let initChat = function (realm) {
    realm.write(() => {
        realm.create('Chat', {
            id: uuid.v1(),
            type: schemaConstants.CHAT_TYPE_USER,
            userId: 'wangp',
            status: 'string'
        });

        realm.create('Chat', {
            id: uuid.v1(),
            type: schemaConstants.CHAT_TYPE_USER,
            userId: 'guoxm',
            status: 'string'
        })
    });
};

export default function configureRealm(path) {
    schema.path = path || Realm.defaultPath;
    let realm = new Realm(schema);

    init(realm);

    return realm;
}