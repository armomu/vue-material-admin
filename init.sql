/**********************************
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2023/12/07 20:30:13
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/


SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for permission
-- ----------------------------
DROP TABLE IF EXISTS `permission`;
CREATE TABLE `permission`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `parentId` int(11) NULL DEFAULT NULL,
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `redirect` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `component` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `layout` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `keepAlive` tinyint(4) NULL DEFAULT NULL,
  `method` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `show` tinyint(4) NOT NULL DEFAULT 1 COMMENT '是否展示在页面菜单',
  `enable` tinyint(4) NOT NULL DEFAULT 1,
  `order` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_30e166e8c6359970755c5727a2`(`code`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of permission
-- ----------------------------
INSERT INTO `permission`  VALUES (21, 'Dashboard', 'Dashboard', '', NULL, '/', '/dashboard/smart-house', 'mdi-gauge', '/src/layout/index.vue', NULL, NULL, NULL, NULL, 1, 1, NULL);
INSERT INTO `permission`  VALUES (24, 'Tesla Model S', 'teslaModelS', '', 21, '/dashboard/tesla-model-s', '', 'mdi-alpha-t', '/src/views/dashboard/teslaModelS.vue', NULL, NULL, NULL, NULL, 1, 1, NULL);
INSERT INTO `permission`  VALUES (25, 'Smart House', 'smartHouse', '', 21, '/dashboard/smart-house', '', 'mdi-alpha-s', '/src/views/dashboard/smartHouse.vue', NULL, NULL, NULL, NULL, 1, 1, NULL);
INSERT INTO `permission`  VALUES (28, 'Componets', 'componets', '', NULL, '/componets', '/componets/table', 'mdi-cube-scan', '/src/layout/index.vue', NULL, NULL, NULL, NULL, 1, 1, NULL);
INSERT INTO `permission`  VALUES (29, 'Samples', 'samples', '', 28, '/componets/samples', '', 'mdi-alpha-s', '/src/views/componets/sample.vue', NULL, NULL, NULL, NULL, 1, 1, NULL);
INSERT INTO `permission`  VALUES (30, 'table', 'Table', '', 28, '/componets/table', '', 'mdi-alpha-t', '/src/views/componets/table.vue', NULL, NULL, NULL, NULL, 1, 1, NULL);
INSERT INTO `permission`  VALUES (31, 'calendar', 'Calendar', '', 28, '/componets/calendar', '', 'mdi-alphac', '/src/views/componets/calendar.vue', NULL, NULL, NULL, NULL, 1, 1, NULL);
INSERT INTO `permission`  VALUES (32, 'Graphics', 'graphics', '', NULL, '/graphics', '/graphics/babylonjs', 'mdi-image', '/src/layout/index.vue', NULL, NULL, NULL, NULL, 1, 1, NULL);
INSERT INTO `permission`  VALUES (33, 'Three.js', 'three-js', '', 32, '/graphics/three.js', '', 'mdi-alpha-t', '/src/views/graphics/threeJs.vue', NULL, NULL, NULL, NULL, 1, 1, NULL);
INSERT INTO `permission`  VALUES (34, 'Pixi.js', 'Pixi-js', '', 32, '/graphics/pixi-js', '', 'mdi-alpha-p', '/src/views/graphics/pixiJs.vue', NULL, NULL, NULL, NULL, 1, 1, NULL);
INSERT INTO `permission`  VALUES (35, 'Babylon.js', 'babylon-js', '', 32, '/graphics/babylon.js', '', 'mdi-alpha-b', '/src/views/graphics/babylonjs.vue', NULL, NULL, NULL, NULL, 1, 1, NULL);
INSERT INTO `permission`  VALUES (36, 'Editor', 'editor', '', NULL, '/editor', '/editor/oreo-editor', 'mdi-view-module', '/src/layout/index.vue', NULL, NULL, NULL, NULL, 1, 1, NULL);
INSERT INTO `permission`  VALUES (37, 'Oreo Editor', 'oreo-editor', '', 36, '/editor/oreo-editor', '', 'mdi-alpha-o', '/src/views/oreo-editor/index.vue', NULL, NULL, NULL, NULL, 1, 1, NULL);
INSERT INTO `permission`  VALUES (38, 'Role-Based Access Control', 'RBAC', '', NULL, '/role-based-access-control', '/role-based-access-control/rbac', 'mdi-account-supervisor-circle', '/src/layout/index.vue', NULL, NULL, NULL, NULL, 1, 1, NULL);
INSERT INTO `permission`  VALUES (39, 'RBAC', 'x', '', 38, '/role-based-access-control/rbac', '', 'mdi-alpha-r', '/src/views/rbac/index.vue', NULL, NULL, NULL, NULL, 1, 1, NULL);

-- ----------------------------
-- Table structure for profile
-- ----------------------------
DROP TABLE IF EXISTS `profile`;
CREATE TABLE `profile`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gender` int(11) NULL DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80',
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `nickName` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_a24972ebd73b106250713dcddd`(`userId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of profile
-- ----------------------------
INSERT INTO `profile` VALUES (1, NULL, 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80', NULL, NULL, 1, 'Admin');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `enable` tinyint(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_ee999bb389d7ac0fd967172c41`(`code`) USING BTREE,
  UNIQUE INDEX `IDX_ae4578dcaed5adff96595e6166`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES (1, 'SUPER_ADMIN', 'Super Admin', 1);
INSERT INTO `role` VALUES (2, 'ROLE_QA', 'Inspector', 1);

-- ----------------------------
-- Table structure for role_permissions_permission
-- ----------------------------
DROP TABLE IF EXISTS `role_permissions_permission`;
CREATE TABLE `role_permissions_permission`  (
  `roleId` int(11) NOT NULL,
  `permissionId` int(11) NOT NULL,
  PRIMARY KEY (`roleId`, `permissionId`) USING BTREE,
  INDEX `IDX_b36cb2e04bc353ca4ede00d87b`(`roleId`) USING BTREE,
  INDEX `IDX_bfbc9e263d4cea6d7a8c9eb3ad`(`permissionId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role_permissions_permission
-- ----------------------------
INSERT INTO `role_permissions_permission` VALUES (2, 21);
INSERT INTO `role_permissions_permission` VALUES (2, 24);
INSERT INTO `role_permissions_permission` VALUES (2, 25);
INSERT INTO `role_permissions_permission` VALUES (2, 26);
INSERT INTO `role_permissions_permission` VALUES (2, 27);
INSERT INTO `role_permissions_permission` VALUES (2, 28);
INSERT INTO `role_permissions_permission` VALUES (2, 29);
INSERT INTO `role_permissions_permission` VALUES (2, 30);
INSERT INTO `role_permissions_permission` VALUES (2, 31);
INSERT INTO `role_permissions_permission` VALUES (2, 32);
INSERT INTO `role_permissions_permission` VALUES (2, 33);
INSERT INTO `role_permissions_permission` VALUES (2, 34);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `enable` tinyint(4) NOT NULL DEFAULT 1,
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updateTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_78a916df40e02a9deb1c4b75ed`(`username`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'admin', '$2a$10$FsAafxTTVVGXfIkJqvaiV.1vPfq4V9HW298McPldJgO829PR52a56', 1, '2023-11-18 16:18:59.150632', '2023-11-18 16:18:59.150632');

-- ----------------------------
-- Table structure for user_roles_role
-- ----------------------------
DROP TABLE IF EXISTS `user_roles_role`;
CREATE TABLE `user_roles_role`  (
  `userId` int(11) NOT NULL,
  `roleId` int(11) NOT NULL,
  PRIMARY KEY (`userId`, `roleId`) USING BTREE,
  INDEX `IDX_5f9286e6c25594c6b88c108db7`(`userId`) USING BTREE,
  INDEX `IDX_4be2f7adf862634f5f803d246b`(`roleId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_roles_role
-- ----------------------------
INSERT INTO `user_roles_role` VALUES (1, 1);
INSERT INTO `user_roles_role` VALUES (1, 2);

SET FOREIGN_KEY_CHECKS = 1;
