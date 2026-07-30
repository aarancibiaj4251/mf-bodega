import {Profile, User} from '../domain/interfaces/user/User';
import type {ItemType} from 'antd/lib/menu/hooks/useItems';
import React from 'react';
import {NavLink} from 'react-router-dom';
import {Constants} from './constants';
import {Product} from '../domain/interfaces/Product';
import keycloak from '../config/auth/keycloak.config';
import {Role} from './Role';


export class Helpers {
  public static fullName(user: User) {
    const firstName = user.givenName?.split(' ') || [''];
    const lastName = user.lastName?.split(' ') || [''];
    return `${firstName[0]} ${lastName[0]}`;
  }

  public static buildMenuItems(profiles: Profile[] = []): ItemType[] {
    return this.buildMenuItemsProfile(profiles);
  }

  public static buildMenuItemsProfile(profileRes: Profile[]): ItemType[] {
    return profileRes.map(res => ({
      key: res.profile.url,
      icon: React.createElement(Constants.ICONS[res.profile.icon!]),
      label: React.createElement(NavLink, {
        to: res.profile.url!, children: res.profile.name
      }),
      children: res.children && res.children.length ? this.buildMenuItemsProfile(res.children) : null,
    }));
  }

  public static filterProducts(products: Product[], filters): Product[] {
    if (!filters) {
      return products;
    }
    if (filters.productsInput?.length) {
      products = products.filter(product => product.name.toLowerCase().includes(filters.productsInput.toLowerCase()));
    }
    if (filters.productsCategories.length) {
      products = products.filter(product => filters.productsCategories.includes(product.categoryId));
    }
    return products.filter(product => product.unitPrice <= filters.productsRangeMax && product.unitPrice >= filters.productsRangeMin);
  }

  public static userRoles() {
    return keycloak
      .realmAccess
      .roles
      .filter(
        (role: string) => !['default-roles-portfoliodev', 'offline_access', 'uma_authorization']
          .includes(role)
      );
  }

  public static isSuperAdmin(roles: string[] = []): boolean {
    if (roles.length) {
      return roles.includes(Role.SUPER_ADMIN);
    }
    return this.userRoles().includes(Role.SUPER_ADMIN);
  }
}
