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
