import {User, UserGoogle} from '../domain/interfaces/user/User';
import {jwtDecode} from 'jwt-decode';
import type {ItemType} from 'antd/lib/menu/hooks/useItems';
import React from 'react';
import {NavLink} from 'react-router-dom';
import {Profile} from '../domain/model/Profile';
import {Constants} from './constants';


export class Helpers {
    public static fullName(user: User) {
        const firstName = user.givenName?.split(' ') || [''];
        const lastName = user.lastName?.split(' ') || [''];
        return `${firstName[0]} ${lastName[0]}`;
    }

    public static decodeJwt = (token: string = ""): UserGoogle => {
        return jwtDecode(token);
    };

    public static buildMenuItems (profiles: Profile[]): ItemType[] {
        if(profiles.length) {
            return profiles.map((profile, index) => ({
                key: profile.url,
                icon: React.createElement(Constants.ICONS[profile.icon!]),
                label: React.createElement(NavLink, {to: profile.url!, children: profile.description}),
            } as ItemType));
        }
        return [];
    }

}
