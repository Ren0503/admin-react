import * as React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import SettingsIcon from '@material-ui/icons/Settings';
import { useMediaQuery, Box } from '@material-ui/core';
import {
    useTranslate,
    DashboardMenuItem,
    MenuItemLink,
} from 'react-admin';

import tags from '../pages/Tags';
import planners from '../pages/Planners';
import recipes from '../pages/Recipes';
import users from '../pages/Users';
import reviews from '../pages/Reviews';
//import categories from '../pages/Categories';
import SubMenu from './SubMenu';

const Menu = ({ onMenuClick, logout, dense = false }) => {
    const [state, setState] = useState({
        menuCatalog: true,
    });
    const translate = useTranslate();
    const isXSmall = useMediaQuery((theme) =>
        theme.breakpoints.down('xs')
    );
    const open = useSelector((state) => state.admin.ui.sidebarOpen);
    useSelector((state) => state.theme); // force rerender on theme change

    const handleToggle = (menu) => {
        setState(state => ({ ...state, [menu]: !state[menu] }));
    };

    return (
        <Box mt={1}>
            {' '}
            <DashboardMenuItem onClick={onMenuClick} sidebarIsOpen={open} />
            <SubMenu
                handleToggle={() => handleToggle('menuCatalog')}
                isOpen={state.menuCatalog}
                sidebarIsOpen={open}
                name="Catalog"
                icon={<recipes.icon />}
                dense={dense}
            >
                <MenuItemLink
                    to={`/recipes`}
                    primaryText={translate(`resources.recipes.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<recipes.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
                <MenuItemLink
                    to={`/tags`}
                    primaryText={translate(`resources.tags.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<tags.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            </SubMenu>
            <MenuItemLink
                    to={`/planner`}
                    primaryText={translate(`resources.planners.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<planners.icon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            <MenuItemLink
                to={`/users`}
                primaryText={translate(`resources.users.name`, {
                    smart_count: 2,
                })}
                leftIcon={<users.icon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
                dense={dense}
            />
            <MenuItemLink
                to={`/reviews`}
                primaryText={translate(`resources.reviews.name`, {
                    smart_count: 2,
                })}
                leftIcon={<reviews.icon />}
                onClick={onMenuClick}
                sidebarIsOpen={open}
                dense={dense}
            />
            {isXSmall && (
                <MenuItemLink
                    to="/configuration"
                    primaryText={translate('pos.configuration')}
                    leftIcon={<SettingsIcon />}
                    onClick={onMenuClick}
                    sidebarIsOpen={open}
                    dense={dense}
                />
            )}
            {isXSmall && logout}
        </Box>
    );
};

export default Menu;
