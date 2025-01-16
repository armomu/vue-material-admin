/*
 Navicat Premium Dump SQL

 Source Server         : 本机电脑测试
 Source Server Type    : MySQL
 Source Server Version : 80400 (8.4.0)
 Source Host           : localhost:3306
 Source Schema         : serve_dev

 Target Server Type    : MySQL
 Target Server Version : 80400 (8.4.0)
 File Encoding         : 65001

 Date: 16/01/2025 17:47:40
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for permission
-- ----------------------------
DROP TABLE IF EXISTS `permission`;
CREATE TABLE `permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `parentId` int DEFAULT NULL,
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `redirect` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `component` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `layout` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `keepAlive` tinyint DEFAULT NULL,
  `method` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `show` tinyint NOT NULL DEFAULT '1' COMMENT '是否展示在页面菜单',
  `enable` tinyint NOT NULL DEFAULT '1',
  `order` int DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `IDX_30e166e8c6359970755c5727a2` (`code`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of permission
-- ----------------------------
BEGIN;
INSERT INTO `permission` (`id`, `name`, `code`, `type`, `parentId`, `path`, `redirect`, `icon`, `component`, `layout`, `keepAlive`, `method`, `description`, `show`, `enable`, `order`) VALUES (21, 'Dashboard', 'Dashboard', '', NULL, '/', '/dashboard/smart-house', 'mdi-gauge', '/src/layout/index.vue', NULL, NULL, NULL, NULL, 1, 1, NULL);
INSERT INTO `permission` (`id`, `name`, `code`, `type`, `parentId`, `path`, `redirect`, `icon`, `component`, `layout`, `keepAlive`, `method`, `description`, `show`, `enable`, `order`) VALUES (24, 'Tesla Model S', 'teslaModelS', '', 21, '/dashboard/tesla-model-s', '', 'mdi-alpha-t', '/src/views/dashboard/teslaModelS.vue', NULL, NULL, NULL, NULL, 1, 1, NULL);
INSERT INTO `permission` (`id`, `name`, `code`, `type`, `parentId`, `path`, `redirect`, `icon`, `component`, `layout`, `keepAlive`, `method`, `description`, `show`, `enable`, `order`) VALUES (25, 'Smart House', 'smartHouse', '', 21, '/dashboard/smart-house', '', 'mdi-alpha-s', '/src/views/dashboard/smartHouse.vue', NULL, NULL, NULL, NULL, 1, 1, NULL);
INSERT INTO `permission` (`id`, `name`, `code`, `type`, `parentId`, `path`, `redirect`, `icon`, `component`, `layout`, `keepAlive`, `method`, `description`, `show`, `enable`, `order`) VALUES (28, 'Componets', 'componets', '', NULL, '/componets', '/componets/table', 'mdi-cube-scan', '/src/layout/index.vue', NULL, NULL, NULL, NULL, 1, 1, NULL);
INSERT INTO `permission` (`id`, `name`, `code`, `type`, `parentId`, `path`, `redirect`, `icon`, `component`, `layout`, `keepAlive`, `method`, `description`, `show`, `enable`, `order`) VALUES (29, 'Samples', 'samples', '', 28, '/componets/samples', '', 'mdi-alpha-s', '/src/views/componets/sample.vue', NULL, NULL, NULL, NULL, 1, 1, NULL);
INSERT INTO `permission` (`id`, `name`, `code`, `type`, `parentId`, `path`, `redirect`, `icon`, `component`, `layout`, `keepAlive`, `method`, `description`, `show`, `enable`, `order`) VALUES (30, 'table', 'Table', '', 28, '/componets/table', '', 'mdi-alpha-t', '/src/views/componets/table.vue', NULL, NULL, NULL, NULL, 1, 1, NULL);
INSERT INTO `permission` (`id`, `name`, `code`, `type`, `parentId`, `path`, `redirect`, `icon`, `component`, `layout`, `keepAlive`, `method`, `description`, `show`, `enable`, `order`) VALUES (31, 'calendar', 'Calendar', '', 28, '/componets/calendar', '', 'mdi-alpha-c', '/src/views/componets/calendar.vue', NULL, NULL, NULL, NULL, 1, 1, NULL);
INSERT INTO `permission` (`id`, `name`, `code`, `type`, `parentId`, `path`, `redirect`, `icon`, `component`, `layout`, `keepAlive`, `method`, `description`, `show`, `enable`, `order`) VALUES (32, 'Graphics', 'graphics', '', NULL, '/graphics', '/graphics/babylonjs', 'mdi-image', '/src/layout/index.vue', NULL, NULL, NULL, NULL, 1, 1, NULL);
INSERT INTO `permission` (`id`, `name`, `code`, `type`, `parentId`, `path`, `redirect`, `icon`, `component`, `layout`, `keepAlive`, `method`, `description`, `show`, `enable`, `order`) VALUES (33, 'Three.js', 'three-js', '', 32, '/graphics/three.js', '', 'mdi-alpha-t', '/src/views/graphics/threeJs.vue', NULL, NULL, NULL, NULL, 1, 1, NULL);
INSERT INTO `permission` (`id`, `name`, `code`, `type`, `parentId`, `path`, `redirect`, `icon`, `component`, `layout`, `keepAlive`, `method`, `description`, `show`, `enable`, `order`) VALUES (34, 'Pixi.js', 'Pixi-js', '', 32, '/graphics/pixi-js', '', 'mdi-alpha-p', '/src/views/graphics/pixiJs.vue', NULL, NULL, NULL, NULL, 1, 1, NULL);
INSERT INTO `permission` (`id`, `name`, `code`, `type`, `parentId`, `path`, `redirect`, `icon`, `component`, `layout`, `keepAlive`, `method`, `description`, `show`, `enable`, `order`) VALUES (35, 'Babylon.js', 'babylon-js', '', 32, '/graphics/babylon.js', '', 'mdi-alpha-b', '/src/views/graphics/babylonjs.vue', NULL, NULL, NULL, NULL, 1, 1, NULL);
INSERT INTO `permission` (`id`, `name`, `code`, `type`, `parentId`, `path`, `redirect`, `icon`, `component`, `layout`, `keepAlive`, `method`, `description`, `show`, `enable`, `order`) VALUES (36, 'Editor', 'editor', '', NULL, '/editor', '/editor/oreo-editor', 'mdi-view-module', '/src/layout/index.vue', NULL, NULL, NULL, NULL, 1, 1, NULL);
INSERT INTO `permission` (`id`, `name`, `code`, `type`, `parentId`, `path`, `redirect`, `icon`, `component`, `layout`, `keepAlive`, `method`, `description`, `show`, `enable`, `order`) VALUES (37, 'Oreo Editor', 'oreo-editor', '', 36, '/editor/oreo-editor', '', 'mdi-alpha-o', '/src/views/oreo-editor/index.vue', NULL, NULL, NULL, NULL, 1, 1, NULL);
INSERT INTO `permission` (`id`, `name`, `code`, `type`, `parentId`, `path`, `redirect`, `icon`, `component`, `layout`, `keepAlive`, `method`, `description`, `show`, `enable`, `order`) VALUES (38, 'Role-Based Access Control', 'RBAC', '', NULL, '/role-based-access-control', '/role-based-access-control/rbac', 'mdi-account-supervisor-circle', '/src/layout/index.vue', NULL, NULL, NULL, NULL, 1, 1, NULL);
INSERT INTO `permission` (`id`, `name`, `code`, `type`, `parentId`, `path`, `redirect`, `icon`, `component`, `layout`, `keepAlive`, `method`, `description`, `show`, `enable`, `order`) VALUES (39, 'Roles', 'Roles', '', 38, '/role-based-access-control/roles', '', 'mdi-alpha-r', '/src/views/rbac/index.vue', NULL, NULL, NULL, NULL, 1, 1, NULL);
INSERT INTO `permission` (`id`, `name`, `code`, `type`, `parentId`, `path`, `redirect`, `icon`, `component`, `layout`, `keepAlive`, `method`, `description`, `show`, `enable`, `order`) VALUES (40, 'Users', 'Users', '', 38, '/role-based-access-control/user', '', 'mdi-alpha-u', '/src/views/rbac/user.vue', NULL, NULL, NULL, NULL, 1, 1, NULL);
COMMIT;

-- ----------------------------
-- Table structure for profile
-- ----------------------------
DROP TABLE IF EXISTS `profile`;
CREATE TABLE `profile` (
  `id` int NOT NULL AUTO_INCREMENT,
  `gender` int DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `userId` int NOT NULL,
  `nickName` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `IDX_a24972ebd73b106250713dcddd` (`userId`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of profile
-- ----------------------------
BEGIN;
INSERT INTO `profile` (`id`, `gender`, `avatar`, `address`, `email`, `userId`, `nickName`) VALUES (1, NULL, 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80', NULL, NULL, 1, 'Admin');
COMMIT;

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `enable` tinyint NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `IDX_ee999bb389d7ac0fd967172c41` (`code`) USING BTREE,
  UNIQUE KEY `IDX_ae4578dcaed5adff96595e6166` (`name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of role
-- ----------------------------
BEGIN;
INSERT INTO `role` (`id`, `code`, `name`, `enable`) VALUES (1, 'SUPER_ADMIN', 'Super Admin', 1);
INSERT INTO `role` (`id`, `code`, `name`, `enable`) VALUES (2, 'ROLE_QA', 'Inspector', 1);
COMMIT;

-- ----------------------------
-- Table structure for role_permissions_permission
-- ----------------------------
DROP TABLE IF EXISTS `role_permissions_permission`;
CREATE TABLE `role_permissions_permission` (
  `roleId` int NOT NULL,
  `permissionId` int NOT NULL,
  PRIMARY KEY (`roleId`,`permissionId`) USING BTREE,
  KEY `IDX_b36cb2e04bc353ca4ede00d87b` (`roleId`) USING BTREE,
  KEY `IDX_bfbc9e263d4cea6d7a8c9eb3ad` (`permissionId`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of role_permissions_permission
-- ----------------------------
BEGIN;
INSERT INTO `role_permissions_permission` (`roleId`, `permissionId`) VALUES (2, 21);
INSERT INTO `role_permissions_permission` (`roleId`, `permissionId`) VALUES (2, 24);
INSERT INTO `role_permissions_permission` (`roleId`, `permissionId`) VALUES (2, 25);
INSERT INTO `role_permissions_permission` (`roleId`, `permissionId`) VALUES (2, 26);
INSERT INTO `role_permissions_permission` (`roleId`, `permissionId`) VALUES (2, 27);
INSERT INTO `role_permissions_permission` (`roleId`, `permissionId`) VALUES (2, 28);
INSERT INTO `role_permissions_permission` (`roleId`, `permissionId`) VALUES (2, 29);
INSERT INTO `role_permissions_permission` (`roleId`, `permissionId`) VALUES (2, 30);
INSERT INTO `role_permissions_permission` (`roleId`, `permissionId`) VALUES (2, 31);
INSERT INTO `role_permissions_permission` (`roleId`, `permissionId`) VALUES (2, 32);
INSERT INTO `role_permissions_permission` (`roleId`, `permissionId`) VALUES (2, 33);
INSERT INTO `role_permissions_permission` (`roleId`, `permissionId`) VALUES (2, 34);
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `enable` tinyint NOT NULL DEFAULT '1',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `IDX_78a916df40e02a9deb1c4b75ed` (`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` (`id`, `username`, `password`, `enable`, `createTime`, `updateTime`) VALUES (1, 'admin', '$2a$10$FsAafxTTVVGXfIkJqvaiV.1vPfq4V9HW298McPldJgO829PR52a56', 1, '2023-11-18 16:18:59.150632', '2023-11-18 16:18:59.150632');
COMMIT;

-- ----------------------------
-- Table structure for user_roles_role
-- ----------------------------
DROP TABLE IF EXISTS `user_roles_role`;
CREATE TABLE `user_roles_role` (
  `userId` int NOT NULL,
  `roleId` int NOT NULL,
  PRIMARY KEY (`userId`,`roleId`) USING BTREE,
  KEY `IDX_5f9286e6c25594c6b88c108db7` (`userId`) USING BTREE,
  KEY `IDX_4be2f7adf862634f5f803d246b` (`roleId`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of user_roles_role
-- ----------------------------
BEGIN;
INSERT INTO `user_roles_role` (`userId`, `roleId`) VALUES (1, 1);
INSERT INTO `user_roles_role` (`userId`, `roleId`) VALUES (1, 2);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
