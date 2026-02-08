#!/usr/bin/env node
/**
 * @file add-comments.js
 * @description 批量为项目文件添加中文注释的脚本
 * 
 * 运行方式: node scripts/add-comments.js
 */

const fs = require('fs');
const path = require('path');

// 文件注释映射配置
const fileComments = {
    // ========== common 模块 ==========
    // interfaces
    'common/interfaces/antares.ts': {
        desc: '核心应用接口定义',
        detail: `本文件定义了 Antares SQL Client 的核心 TypeScript 接口。
包括连接配置、数据库对象、查询结果、表结构等核心类型定义。
被整个应用程序广泛使用，是类型系统的基础。`
    },
    'common/interfaces/customizations.ts': {
        desc: '数据库自定义配置接口',
        detail: `本文件定义了 Customizations 接口类型。
用于描述各数据库特有的功能和配置项。
被 mysql.ts、postgresql.ts 等配置文件实现。`
    },
    'common/interfaces/exporter.ts': {
        desc: '数据导出接口定义',
        detail: `本文件定义了数据导出功能相关的接口。
包括导出选项、导出结果等类型定义。`
    },
    'common/interfaces/importer.ts': {
        desc: '数据导入接口定义',
        detail: `本文件定义了数据导入功能相关的接口。
包括导入选项、导入结果等类型定义。`
    },
    'common/interfaces/tableApis.ts': {
        desc: '表操作 API 接口',
        detail: `本文件定义了表数据操作相关的接口。
包括增删改查、分页、排序等功能的类型定义。`
    },
    'common/interfaces/workers.ts': {
        desc: 'Web Workers 接口定义',
        detail: `本文件定义了后台任务（Worker）相关的接口。
用于导入导出等耗时操作的后台处理。`
    },

    // libs
    'common/libs/bufferToBase64.ts': {
        desc: 'Buffer 转 Base64 工具',
        detail: `本文件提供将 Buffer 数据转换为 Base64 字符串的功能。
主要用于二进制数据的编码显示。`
    },
    'common/libs/encrypter.ts': {
        desc: '加密解密工具',
        detail: `本文件提供密码加密和解密功能。
用于安全存储数据库连接密码等敏感信息。`
    },
    'common/libs/fakerCustom.ts': {
        desc: 'Faker 自定义生成器',
        detail: `本文件提供自定义的数据生成方法。
扩展 Faker.js 的功能，生成特定格式的测试数据。`
    },
    'common/libs/formatBytes.ts': {
        desc: '字节格式化工具',
        detail: `本文件提供将字节数转换为可读格式的功能。
如 1024 转换为 "1 KB"。`
    },
    'common/libs/getArrayDepth.ts': {
        desc: '数组深度检测工具',
        detail: `本文件提供获取嵌套数组深度的功能。
用于处理 PostgreSQL 数组类型字段。`
    },
    'common/libs/hexToBinary.ts': {
        desc: '十六进制转二进制工具',
        detail: `本文件提供十六进制字符串与二进制数据的转换功能。
用于处理 BLOB、BINARY 等字段类型的显示。`
    },
    'common/libs/langDetector.ts': {
        desc: 'SQL 语言检测器',
        detail: `本文件提供 SQL 方言检测功能。
根据 SQL 语句特征识别是 MySQL、PostgreSQL 等哪种数据库。`
    },
    'common/libs/mimeFromHex.ts': {
        desc: '从十六进制获取 MIME 类型',
        detail: `本文件提供根据文件头（魔数）识别文件 MIME 类型的功能。
用于 BLOB 字段中存储的文件类型识别。`
    },
    'common/libs/sqlUtils.ts': {
        desc: 'SQL 工具函数集',
        detail: `本文件提供 SQL 相关的工具函数。
包括 SQL 解析、转义、格式化等功能。
是 SQL 处理的核心工具库。`
    },
    'common/libs/uidGen.ts': {
        desc: '唯一 ID 生成器',
        detail: `本文件提供生成唯一标识符的功能。
用于连接、标签页等对象的唯一标识。`
    },

    // ========== main 模块 ==========
    // ipc-handlers
    'main/ipc-handlers/index.ts': {
        desc: 'IPC 处理器入口',
        detail: `本文件是所有 IPC 处理器的入口文件。
统一注册所有 IPC 事件处理器。
连接主进程和渲染进程的通信桥梁。`
    },
    'main/ipc-handlers/application.ts': {
        desc: '应用级 IPC 处理器',
        detail: `本文件处理应用程序级别的 IPC 事件。
包括窗口操作、系统信息、应用设置等。`
    },
    'main/ipc-handlers/connection.ts': {
        desc: '连接管理 IPC 处理器',
        detail: `本文件处理数据库连接相关的 IPC 事件。
包括建立连接、断开连接、测试连接等。`
    },
    'main/ipc-handlers/database.ts': {
        desc: '数据库操作 IPC 处理器',
        detail: `本文件处理数据库级别的 IPC 事件。
包括创建数据库、删除数据库等。`
    },
    'main/ipc-handlers/functions.ts': {
        desc: '函数管理 IPC 处理器',
        detail: `本文件处理数据库函数相关的 IPC 事件。
包括创建、修改、删除函数等。`
    },
    'main/ipc-handlers/routines.ts': {
        desc: '存储过程 IPC 处理器',
        detail: `本文件处理存储过程相关的 IPC 事件。
包括创建、修改、删除、执行存储过程等。`
    },
    'main/ipc-handlers/schedulers.ts': {
        desc: '调度器 IPC 处理器',
        detail: `本文件处理调度器/事件相关的 IPC 事件。
包括创建、修改、删除调度任务等。`
    },
    'main/ipc-handlers/schema.ts': {
        desc: '模式操作 IPC 处理器',
        detail: `本文件处理数据库模式相关的 IPC 事件。
包括获取模式信息、导出模式、创建模式等。
是数据库结构操作的核心处理器。`
    },
    'main/ipc-handlers/tables.ts': {
        desc: '表操作 IPC 处理器',
        detail: `本文件处理数据库表相关的 IPC 事件。
包括创建表、修改表结构、表数据操作、索引管理等。
是最重要的 IPC 处理器之一。`
    },
    'main/ipc-handlers/triggers.ts': {
        desc: '触发器 IPC 处理器',
        detail: `本文件处理数据库触发器相关的 IPC 事件。
包括创建、修改、删除触发器等。`
    },
    'main/ipc-handlers/updates.ts': {
        desc: '应用更新 IPC 处理器',
        detail: `本文件处理应用程序更新相关的 IPC 事件。
包括检查更新、下载更新、安装更新等。`
    },
    'main/ipc-handlers/users.ts': {
        desc: '用户管理 IPC 处理器',
        detail: `本文件处理数据库用户管理相关的 IPC 事件。
包括创建用户、修改权限等（部分数据库支持）。`
    },
    'main/ipc-handlers/views.ts': {
        desc: '视图 IPC 处理器',
        detail: `本文件处理数据库视图相关的 IPC 事件。
包括创建、修改、删除视图等。`
    },

    // libs
    'main/libs/ClientsFactory.ts': {
        desc: '数据库客户端工厂类',
        detail: `本文件实现了工厂模式的数据库客户端创建。
根据数据库类型（MySQL、PostgreSQL 等）创建对应的客户端实例。`
    },
    'main/libs/ShortcutRegister.ts': {
        desc: '快捷键注册管理器',
        detail: `本文件负责应用程序快捷键的注册和管理。
支持全局快捷键和局部快捷键，跨平台兼容。`
    },

    // clients
    'main/libs/clients/BaseClient.ts': {
        desc: '数据库客户端基类',
        detail: `本文件定义了数据库客户端的抽象基类。
提供通用的连接、查询、事务等基础方法。
MySQL、PostgreSQL 等客户端都继承此类。`
    },
    'main/libs/clients/MySQLClient.ts': {
        desc: 'MySQL/MariaDB 客户端',
        detail: `本文件实现了 MySQL 和 MariaDB 的数据库客户端。
提供完整的 MySQL 特性支持，包括存储过程、触发器、调度器等。
是功能最完整的客户端实现。`
    },
    'main/libs/clients/PostgreSQLClient.ts': {
        desc: 'PostgreSQL 客户端',
        detail: `本文件实现了 PostgreSQL 的数据库客户端。
支持 PostgreSQL 特有功能，如物化视图、触发器函数、数组类型等。`
    },
    'main/libs/clients/SQLiteClient.ts': {
        desc: 'SQLite 客户端',
        detail: `本文件实现了 SQLite 的数据库客户端。
使用 better-sqlite3 库，支持基本的表、视图、触发器操作。`
    },
    'main/libs/clients/FirebirdSQLClient.ts': {
        desc: 'Firebird SQL 客户端',
        detail: `本文件实现了 Firebird SQL 的数据库客户端。
使用 node-firebird 库，支持存储过程、触发器等功能。`
    },

    // exporters
    'main/libs/exporters/BaseExporter.ts': {
        desc: '导出器基类',
        detail: `本文件定义了数据导出器的抽象基类。
提供导出进度回调、文件写入等通用功能。
MySQL、PostgreSQL 导出器继承此类。`
    },
    'main/libs/exporters/sql/MysqlExporter.ts': {
        desc: 'MySQL 导出器',
        detail: `本文件实现了 MySQL 格式的数据库导出。
生成兼容 MySQL 的 SQL 转储文件。`
    },
    'main/libs/exporters/sql/PostgreSQLExporter.ts': {
        desc: 'PostgreSQL 导出器',
        detail: `本文件实现了 PostgreSQL 格式的数据库导出。
生成兼容 PostgreSQL 的 SQL 转储文件。`
    },
    'main/libs/exporters/sql/SqlExporter.ts': {
        desc: 'SQL 导出器基类',
        detail: `本文件是 SQL 格式导出器的基类。
定义 SQL 转储的通用结构和方法。`
    },

    // importers
    'main/libs/importers/BaseImporter.ts': {
        desc: '导入器基类',
        detail: `本文件定义了数据导入器的抽象基类。
提供导入进度回调、SQL 执行等通用功能。`
    },
    'main/libs/importers/sql/MySQLlImporter.ts': {
        desc: 'MySQL 导入器',
        detail: `本文件实现了 MySQL SQL 文件的导入功能。
解析和执行 MySQL 格式的 SQL 转储文件。`
    },
    'main/libs/importers/sql/PostgreSQLImporter.ts': {
        desc: 'PostgreSQL 导入器',
        detail: `本文件实现了 PostgreSQL SQL 文件的导入功能。
解析和执行 PostgreSQL 格式的 SQL 转储文件。`
    },

    // parsers
    'main/libs/parsers/MySQLParser.ts': {
        desc: 'MySQL SQL 解析器',
        detail: `本文件实现了 MySQL SQL 语句的解析功能。
用于导入时分析 SQL 文件结构。`
    },
    'main/libs/parsers/PostgreSQLParser.ts': {
        desc: 'PostgreSQL SQL 解析器',
        detail: `本文件实现了 PostgreSQL SQL 语句的解析功能。
用于导入时分析 SQL 文件结构。`
    },

    // misc
    'main/libs/misc/ipcLogger.ts': {
        desc: 'IPC 日志记录器',
        detail: `本文件提供 IPC 通信的日志记录功能。
用于调试和监控主进程与渲染进程的通信。`
    },
    'main/libs/misc/validateSender.ts': {
        desc: 'IPC 发送者验证',
        detail: `本文件提供 IPC 消息发送者的验证功能。
用于安全检查，确保消息来源可信。`
    },

    // workers
    'main/workers/exporter.ts': {
        desc: '导出 Worker',
        detail: `本文件是数据库导出的后台 Worker 线程。
在独立线程中执行耗时的导出操作，避免阻塞主进程。`
    },
    'main/workers/importer.ts': {
        desc: '导入 Worker',
        detail: `本文件是数据库导入的后台 Worker 线程。
在独立线程中执行耗时的导入操作，避免阻塞主进程。`
    },

    // ========== renderer 模块 ==========
    // stores
    'renderer/stores/application.ts': {
        desc: '应用状态管理 Store',
        detail: `本文件使用 Pinia 管理应用级别的状态。
包括设置模态框显示、更新状态、草稿本显示等。`
    },
    'renderer/stores/connections.ts': {
        desc: '连接状态管理 Store',
        detail: `本文件使用 Pinia 管理数据库连接的状态。
包括连接列表、连接配置的增删改查操作。
使用 electron-store 持久化存储连接信息。`
    },
    'renderer/stores/console.ts': {
        desc: '控制台状态管理 Store',
        detail: `本文件使用 Pinia 管理调试控制台的状态。
记录查询日志、错误信息、调试信息等。`
    },
    'renderer/stores/history.ts': {
        desc: '查询历史状态 Store',
        detail: `本文件使用 Pinia 管理 SQL 查询历史记录。
支持搜索历史、重用历史查询等功能。`
    },
    'renderer/stores/notifications.ts': {
        desc: '通知状态管理 Store',
        detail: `本文件使用 Pinia 管理应用通知的状态。
包括成功、错误、警告等类型的通知消息。`
    },
    'renderer/stores/schemaExport.ts': {
        desc: '模式导出状态 Store',
        detail: `本文件使用 Pinia 管理数据库导出功能的状态。
包括导出进度、导出配置等。`
    },
    'renderer/stores/scratchpad.ts': {
        desc: '草稿本状态 Store',
        detail: `本文件使用 Pinia 管理草稿本/笔记功能的状态。
支持创建、编辑、删除笔记等操作。`
    },
    'renderer/stores/settings.ts': {
        desc: '设置状态管理 Store',
        detail: `本文件使用 Pinia 管理应用设置的状态。
包括主题、语言、编辑器配置、快捷键等设置项。
使用 electron-store 持久化存储设置。`
    },
    'renderer/stores/workspaces.ts': {
        desc: '工作区状态管理 Store',
        detail: `本文件使用 Pinia 管理工作区的状态。
工作区管理打开的标签页、当前选中的连接、查询结果等。
是应用状态管理的核心 Store。`
    },

    // composables
    'renderer/composables/useFilters.ts': {
        desc: '过滤器组合式函数',
        detail: `本文件提供表格数据过滤的组合式函数。
用于构建和应用查询过滤条件。`
    },
    'renderer/composables/useFocusTrap.ts': {
        desc: '焦点陷阱组合式函数',
        detail: `本文件提供焦点陷阱功能的组合式函数。
用于模态框等组件的无障碍访问支持。`
    },
    'renderer/composables/useResultTables.ts': {
        desc: '结果表格组合式函数',
        detail: `本文件提供查询结果表格的组合式函数。
封装表格数据处理、分页、排序等逻辑。`
    },

    // libs
    'renderer/libs/camelize.ts': {
        desc: '驼峰命名转换工具',
        detail: `本文件提供字符串命名格式转换功能。
将下划线命名转换为驼峰命名。`
    },
    'renderer/libs/colorShade.ts': {
        desc: '颜色明暗调整工具',
        detail: `本文件提供调整颜色明暗度的功能。
用于根据基础颜色生成变体色。`
    },
    'renderer/libs/copyText.ts': {
        desc: '复制文本到剪贴板',
        detail: `本文件提供将文本复制到系统剪贴板的功能。`
    },
    'renderer/libs/exportRows.ts': {
        desc: '导出行数据工具',
        detail: `本文件提供将表格行数据导出为各种格式的功能。
支持 CSV、JSON、SQL INSERT 等格式。`
    },
    'renderer/libs/getContrast.ts': {
        desc: '获取对比色工具',
        detail: `本文件提供根据背景色获取合适前景色的功能。
用于确保文本可读性。`
    },
    'renderer/libs/hexToRgba.ts': {
        desc: '十六进制转 RGBA 工具',
        detail: `本文件提供十六进制颜色值转换为 RGBA 格式的功能。
支持透明度设置。`
    },
    'renderer/libs/unproxify.ts': {
        desc: '解除 Vue 响应式代理',
        detail: `本文件提供将 Vue 响应式对象转换为普通对象的功能。
用于向主进程传递数据时避免代理对象问题。`
    },

    // ipc-api
    'renderer/ipc-api/Application.ts': {
        desc: '应用 IPC API',
        detail: `本文件封装了应用级别的 IPC 调用。
提供便捷的方法调用主进程的应用功能。`
    },
    'renderer/ipc-api/Connection.ts': {
        desc: '连接 IPC API',
        detail: `本文件封装了数据库连接相关的 IPC 调用。
提供便捷的方法进行连接管理。`
    },
    'renderer/ipc-api/Databases.ts': {
        desc: '数据库 IPC API',
        detail: `本文件封装了数据库操作相关的 IPC 调用。`
    },
    'renderer/ipc-api/Functions.ts': {
        desc: '函数 IPC API',
        detail: `本文件封装了数据库函数相关的 IPC 调用。`
    },
    'renderer/ipc-api/Routines.ts': {
        desc: '存储过程 IPC API',
        detail: `本文件封装了存储过程相关的 IPC 调用。`
    },
    'renderer/ipc-api/Schedulers.ts': {
        desc: '调度器 IPC API',
        detail: `本文件封装了调度器/事件相关的 IPC 调用。`
    },
    'renderer/ipc-api/Schema.ts': {
        desc: '模式 IPC API',
        detail: `本文件封装了数据库模式相关的 IPC 调用。
包括获取结构、导出模式等功能。`
    },
    'renderer/ipc-api/Tables.ts': {
        desc: '表 IPC API',
        detail: `本文件封装了数据库表相关的 IPC 调用。
包括查询数据、修改结构等核心功能。`
    },
    'renderer/ipc-api/Triggers.ts': {
        desc: '触发器 IPC API',
        detail: `本文件封装了触发器相关的 IPC 调用。`
    },
    'renderer/ipc-api/Users.ts': {
        desc: '用户 IPC API',
        detail: `本文件封装了用户管理相关的 IPC 调用。`
    },
    'renderer/ipc-api/Views.ts': {
        desc: '视图 IPC API',
        detail: `本文件封装了视图相关的 IPC 调用。`
    },

    // i18n
    'renderer/i18n/index.ts': {
        desc: '国际化配置入口',
        detail: `本文件是 Vue-i18n 的配置入口。
初始化多语言支持，加载所有语言包。`
    },
    'renderer/i18n/supported-locales.ts': {
        desc: '支持的语言列表',
        detail: `本文件定义了应用支持的所有语言。
包括语言代码、显示名称等信息。`
    }
};

// Vue 组件通用注释模板
const vueComponentComments = {
    // 基础组件
    'BaseConfirmModal.vue': { desc: '确认对话框组件', detail: '通用的确认/取消操作对话框。' },
    'BaseContextMenu.vue': { desc: '右键菜单组件', detail: '可复用的右键上下文菜单。' },
    'BaseIcon.vue': { desc: '图标组件', detail: '封装 MDI 图标库的图标显示组件。' },
    'BaseLoader.vue': { desc: '加载指示器组件', detail: '显示加载中状态的动画指示器。' },
    'BaseMap.vue': { desc: '地图组件', detail: '使用 Leaflet 显示地理空间数据。' },
    'BaseNotification.vue': { desc: '通知组件', detail: '显示成功/错误/警告等通知消息。' },
    'BaseSelect.vue': { desc: '下拉选择组件', detail: '可搜索、支持分组的下拉选择框。' },
    'BaseTextEditor.vue': { desc: '文本编辑器组件', detail: '基于 Ace Editor 的代码/文本编辑器。' },
    'BaseUploadInput.vue': { desc: '文件上传组件', detail: '文件选择和上传输入框。' },
    'BaseVirtualScroll.vue': { desc: '虚拟滚动组件', detail: '大数据量列表的虚拟滚动渲染。' },

    // 布局组件
    'TheTitleBar.vue': { desc: '标题栏组件', detail: '应用程序自定义标题栏，包含窗口控制按钮。' },
    'TheSettingBar.vue': { desc: '设置侧边栏组件', detail: '左侧连接和设置导航栏。' },
    'TheFooter.vue': { desc: '页脚状态栏组件', detail: '显示连接状态、数据库信息等状态信息。' },
    'TheNotificationsBoard.vue': { desc: '通知面板组件', detail: '显示所有通知消息的面板。' },
    'TheScratchpad.vue': { desc: '草稿本组件', detail: '笔记/待办事项管理面板。' },

    // 调试
    'DebugConsole.vue': { desc: '调试控制台组件', detail: '显示查询日志和调试信息的控制台。' },

    // 工作区组件
    'Workspace.vue': { desc: '工作区组件', detail: '数据库连接的主工作区容器，管理标签页和侧边栏。' },
    'WorkspaceAddConnectionPanel.vue': { desc: '新建连接面板', detail: '创建新数据库连接的表单面板。' },
    'WorkspaceEditConnectionPanel.vue': { desc: '编辑连接面板', detail: '编辑现有数据库连接的表单面板。' },
    'WorkspaceEmptyState.vue': { desc: '空状态组件', detail: '无内容时显示的占位提示。' },
    'WorkspaceExploreBar.vue': { desc: '数据库导航栏', detail: '左侧数据库结构树形导航。' },
    'WorkspaceExploreBarSchema.vue': { desc: '模式导航组件', detail: '显示数据库模式结构的树形组件。' },
    'WorkspaceExploreBarSchemaContext.vue': { desc: '模式右键菜单', detail: '模式节点的右键上下文菜单。' },
    'WorkspaceExploreBarTableContext.vue': { desc: '表右键菜单', detail: '表节点的右键上下文菜单。' },
    'WorkspaceExploreBarMiscContext.vue': { desc: '杂项右键菜单', detail: '其他节点的右键上下文菜单。' },
    'WorkspaceExploreBarMiscFolderContext.vue': { desc: '文件夹右键菜单', detail: '文件夹节点的右键上下文菜单。' },

    // 查询相关
    'QueryEditor.vue': { desc: 'SQL 查询编辑器', detail: '基于 Ace Editor 的 SQL 编辑器，支持语法高亮和自动补全。' },
    'WorkspaceTabQuery.vue': { desc: '查询标签页', detail: 'SQL 查询的完整界面，包含编辑器和结果表格。' },
    'WorkspaceTabQueryEmptyState.vue': { desc: '查询空状态', detail: '无查询结果时的占位提示。' },
    'WorkspaceTabQueryTable.vue': { desc: '查询结果表格', detail: '显示 SQL 查询结果的数据表格。' },
    'WorkspaceTabQueryTableContext.vue': { desc: '结果表格右键菜单', detail: '查询结果的右键操作菜单。' },
    'WorkspaceTabQueryTableRow.vue': { desc: '结果表格行', detail: '查询结果表格的单行组件。' },

    // 数据表
    'WorkspaceTabTable.vue': { desc: '数据表标签页', detail: '查看和编辑表数据的界面。' },
    'WorkspaceTabTableFilters.vue': { desc: '表过滤器', detail: '数据表的过滤条件设置组件。' },

    // 新建对象
    'WorkspaceTabNewTable.vue': { desc: '新建表页面', detail: '创建新数据库表的界面。' },
    'WorkspaceTabNewTableEmptyState.vue': { desc: '新建表空状态', detail: '新建表时无列定义的占位提示。' },
    'WorkspaceTabNewView.vue': { desc: '新建视图页面', detail: '创建新视图的界面。' },
    'WorkspaceTabNewMaterializedView.vue': { desc: '新建物化视图', detail: '创建 PostgreSQL 物化视图的界面。' },
    'WorkspaceTabNewFunction.vue': { desc: '新建函数页面', detail: '创建新数据库函数的界面。' },
    'WorkspaceTabNewRoutine.vue': { desc: '新建存储过程', detail: '创建新存储过程的界面。' },
    'WorkspaceTabNewTrigger.vue': { desc: '新建触发器页面', detail: '创建新触发器的界面。' },
    'WorkspaceTabNewTriggerFunction.vue': { desc: '新建触发器函数', detail: '创建 PostgreSQL 触发器函数的界面。' },
    'WorkspaceTabNewScheduler.vue': { desc: '新建调度器页面', detail: '创建新调度任务的界面。' },

    // 属性编辑
    'WorkspaceTabPropsTable.vue': { desc: '表属性页面', detail: '编辑表结构、索引、外键等属性。' },
    'WorkspaceTabPropsTableFields.vue': { desc: '表字段编辑', detail: '编辑表字段定义的组件。' },
    'WorkspaceTabPropsTableRow.vue': { desc: '表字段行', detail: '表结构编辑中的单行字段组件。' },
    'WorkspaceTabPropsTableIndexesModal.vue': { desc: '索引编辑对话框', detail: '编辑表索引的模态框。' },
    'WorkspaceTabPropsTableForeignModal.vue': { desc: '外键编辑对话框', detail: '编辑表外键的模态框。' },
    'WorkspaceTabPropsTableChecksModal.vue': { desc: '检查约束对话框', detail: '编辑检查约束的模态框。' },
    'WorkspaceTabPropsTableDdlModal.vue': { desc: 'DDL 查看对话框', detail: '显示表的 DDL 语句。' },
    'WorkspaceTabPropsTableContext.vue': { desc: '表属性右键菜单', detail: '表属性页面的右键操作菜单。' },
    'WorkspaceTabPropsView.vue': { desc: '视图属性页面', detail: '编辑视图定义和属性。' },
    'WorkspaceTabPropsMaterializedView.vue': { desc: '物化视图属性', detail: '编辑物化视图的属性。' },
    'WorkspaceTabPropsFunction.vue': { desc: '函数属性页面', detail: '编辑函数定义和参数。' },
    'WorkspaceTabPropsFunctionParamsModal.vue': { desc: '函数参数对话框', detail: '编辑函数参数的模态框。' },
    'WorkspaceTabPropsRoutine.vue': { desc: '存储过程属性', detail: '编辑存储过程定义和参数。' },
    'WorkspaceTabPropsRoutineParamsModal.vue': { desc: '过程参数对话框', detail: '编辑存储过程参数的模态框。' },
    'WorkspaceTabPropsTrigger.vue': { desc: '触发器属性页面', detail: '编辑触发器定义和配置。' },
    'WorkspaceTabPropsTriggerFunction.vue': { desc: '触发器函数属性', detail: '编辑 PostgreSQL 触发器函数。' },
    'WorkspaceTabPropsScheduler.vue': { desc: '调度器属性页面', detail: '编辑调度任务的定义和配置。' },
    'WorkspaceTabPropsSchedulerTimingModal.vue': { desc: '调度时间对话框', detail: '配置调度任务执行时间。' },

    // 模态框
    'ModalSettings.vue': { desc: '设置对话框', detail: '应用程序设置的主模态框。' },
    'ModalSettingsChangelog.vue': { desc: '更新日志页面', detail: '显示版本更新日志。' },
    'ModalSettingsData.vue': { desc: '数据设置页面', detail: '数据相关的设置选项。' },
    'ModalSettingsDataExport.vue': { desc: '导出设置页面', detail: '数据导出的设置选项。' },
    'ModalSettingsDataImport.vue': { desc: '导入设置页面', detail: '数据导入的设置选项。' },
    'ModalSettingsShortcuts.vue': { desc: '快捷键设置', detail: '自定义快捷键的设置页面。' },
    'ModalSettingsUpdate.vue': { desc: '更新设置页面', detail: '应用更新相关的设置。' },
    'ModalAllConnections.vue': { desc: '所有连接对话框', detail: '显示和管理所有保存的连接。' },
    'ModalAskCredentials.vue': { desc: '凭证输入对话框', detail: '请求输入用户名密码的对话框。' },
    'ModalAskParameters.vue': { desc: '参数输入对话框', detail: '请求输入存储过程参数的对话框。' },
    'ModalConnectionAppearance.vue': { desc: '连接外观设置', detail: '设置连接的图标和颜色。' },
    'ModalDiscardChanges.vue': { desc: '放弃更改对话框', detail: '确认放弃未保存更改的对话框。' },
    'ModalEditSchema.vue': { desc: '编辑模式对话框', detail: '编辑数据库模式属性。' },
    'ModalExportSchema.vue': { desc: '导出模式对话框', detail: '导出数据库结构和数据的配置。' },
    'ModalFakerRows.vue': { desc: 'Faker 数据生成', detail: '配置和生成测试数据的对话框。' },
    'ModalFolderAppearance.vue': { desc: '文件夹外观设置', detail: '设置连接文件夹的外观。' },
    'ModalHistory.vue': { desc: '查询历史对话框', detail: '浏览和搜索 SQL 查询历史。' },
    'ModalImportSchema.vue': { desc: '导入模式对话框', detail: '导入 SQL 文件的配置。' },
    'ModalNewSchema.vue': { desc: '新建模式对话框', detail: '创建新数据库模式。' },
    'ModalNoteEdit.vue': { desc: '编辑笔记对话框', detail: '编辑草稿本笔记。' },
    'ModalNoteNew.vue': { desc: '新建笔记对话框', detail: '创建新的草稿本笔记。' },
    'ModalProcessesList.vue': { desc: '进程列表对话框', detail: '显示数据库当前进程/连接。' },
    'ModalProcessesListContext.vue': { desc: '进程右键菜单', detail: '进程列表的右键操作菜单。' },
    'ModalProcessesListRow.vue': { desc: '进程列表行', detail: '进程列表中的单行组件。' },

    // 其他
    'FakerSelect.vue': { desc: 'Faker 方法选择器', detail: '选择 Faker.js 数据生成方法的下拉框。' },
    'ForeignKeySelect.vue': { desc: '外键选择器', detail: '选择外键引用值的下拉框。' },
    'KeyPressDetector.vue': { desc: '按键检测组件', detail: '检测和显示用户按键的组件。' },
    'ScratchpadNote.vue': { desc: '草稿本笔记项', detail: '单个草稿本笔记的显示组件。' },
    'SettingBarConnections.vue': { desc: '连接列表组件', detail: '设置栏中的连接项列表。' },
    'SettingBarConnectionsFolder.vue': { desc: '连接文件夹', detail: '设置栏中的连接分组文件夹。' },
    'SettingBarContext.vue': { desc: '设置栏右键菜单', detail: '设置栏的右键操作菜单。' },
    'WorkspaceTabsContext.vue': { desc: '标签页右键菜单', detail: '工作区标签页的右键操作菜单。' }
};

/**
 * 为 TypeScript 文件生成注释
 */
function generateTsComment(filePath, config) {
    const fileName = path.basename(filePath);
    const modulePath = filePath.replace(/^src\//, '').replace(/\.ts$/, '');

    return `/**
 * @file ${fileName}
 * @description ${config.desc}
 *
 * ${config.detail.split('\n').join('\n * ')}
 *
 * @module ${modulePath}
 */
`;
}

/**
 * 为 Vue 组件生成注释
 */
function generateVueComment(filePath, config) {
    const fileName = path.basename(filePath);
    const modulePath = 'renderer/components/' + fileName.replace(/\.vue$/, '');

    return `<!--
  @file ${fileName}
  @description ${config.desc}

  ${config.detail}

  @module ${modulePath}
-->
`;
}

/**
 * 处理单个文件
 */
function processFile(filePath) {
    const relativePath = filePath.replace(/.*\/src\//, '');
    const fileName = path.basename(filePath);
    const ext = path.extname(filePath);

    // 跳过已有注释的文件
    const content = fs.readFileSync(filePath, 'utf-8');
    if (content.startsWith('/**') || content.startsWith('<!--')) {
        console.log(`跳过 (已有注释): ${relativePath}`);
        return false;
    }

    let comment = null;

    if (ext === '.ts') {
        // 查找 TS 文件的注释配置
        const config = fileComments[relativePath];
        if (config) {
            comment = generateTsComment(filePath, config);
        }
    } else if (ext === '.vue') {
        // 查找 Vue 组件的注释配置
        const config = vueComponentComments[fileName];
        if (config) {
            comment = generateVueComment(filePath, config);
        }
    }

    if (comment) {
        const newContent = comment + content;
        fs.writeFileSync(filePath, newContent, 'utf-8');
        console.log(`已添加注释: ${relativePath}`);
        return true;
    } else {
        console.log(`未找到配置: ${relativePath}`);
        return false;
    }
}

/**
 * 递归查找所有文件
 */
function findFiles(dir, extensions) {
    let results = [];
    const list = fs.readdirSync(dir);

    for (const file of list) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            // 跳过 i18n 翻译文件目录（太多重复）
            if (file === 'i18n' || file === 'node_modules') continue;
            results = results.concat(findFiles(filePath, extensions));
        } else {
            const ext = path.extname(file);
            if (extensions.includes(ext)) {
                results.push(filePath);
            }
        }
    }

    return results;
}

// 主函数
function main() {
    const srcDir = path.resolve(__dirname, '../src');
    const files = findFiles(srcDir, ['.ts', '.vue']);

    console.log(`找到 ${files.length} 个文件\n`);

    let processed = 0;
    let skipped = 0;
    let notFound = 0;

    for (const file of files) {
        const result = processFile(file);
        if (result === true) processed++;
        else if (result === false) skipped++;
        else notFound++;
    }

    console.log(`\n完成！`);
    console.log(`- 已添加注释: ${processed}`);
    console.log(`- 已跳过: ${skipped}`);
    console.log(`- 未找到配置: ${notFound}`);
}

main();
