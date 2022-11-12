import React from 'react';
import {Button, message, Popconfirm} from "antd";
import {deleteProject} from "@/services/project";
import {deleteGroupProject} from "@/services/group-project";

export type RemoveGroupProjectProps = {
  projectId: string;

};

const RemoveGroupProject: React.FC<RemoveGroupProjectProps> = (props) => {


  return (<>
    <Popconfirm placement="right" title="删除项目"
                onConfirm={() => deleteGroupProject({
                  id: props.projectId
                }).then((r) => {
                  if(r.code===200){
                    message.success('删除成功');
                  }else {
                    message.error(r.message || '删除失败');
                  }
                })}
                okText="是"
                cancelText="否">
      <Button danger>删除</Button>
    </Popconfirm>
  </>);
}

export default React.memo(RemoveGroupProject)
