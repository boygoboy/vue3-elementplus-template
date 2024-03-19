declare interface SysMenuQuery{
    keyword:string;
}

declare interface SysMenuType{
    id:string,
    parentId:string,
    type:'1'|'2',
    path:string,
    redirect:string,
    code:string,
    component:string,
    meta:{
        title:string,
        icon:string,
        linkTo:string,
        cache:boolean,
        hidden:boolean,
        isBreadcrumd:boolean,
    },
    sort:number,
    remark:string,
    createTime:string,
    updateTime:string,
    children:SysMenuType[]
}

declare interface SysRoleQuery{
    name:string;
}

declare interface SyusRoleType{
    id:string;
    roleName:string;
    roleCode:string;
    status:boolean;
    remark:string;
    createTime:string;
    updateTime:string;
}

// 用户查询条件
declare interface SysUserQuery {
    keyword: string; // 搜索条件：帐号、昵称、手机号
}

// 用户实体类型
declare interface SysUserType {
    id: string;
    username: string;
    password: string;
    nickName: string;
    mobile: string;
    roleIds: string[];
    email: string;
    imageUrl: string;
    remark: string;
    accountNonExpired: boolean;  // 帐号是否过期(true 未过期，false已过期) 生成 true 或 false 概率都是 1/2
    accountNonLocked: boolean; // 帐户是否被锁定(true 未锁定，false已锁定)
    credentialsNonExpired: boolean; // 密码是否过期(true  未过期，false已过期)
    createTime: string;
    updateTime: string;
}

/**
 * 重置密码表单数据类型
 */
declare interface PwdResetForm {
    userId: string;
    newPassword: string; // 新密码
    repPassword: string; // 确认密码
}