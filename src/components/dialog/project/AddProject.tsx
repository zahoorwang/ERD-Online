import React from 'react';
import {Button} from "@blueprintjs/core";
import ProForm, {ModalForm, ProFormText, ProFormTextArea} from '@ant-design/pro-form';
import useProjectStore from "@/store/project/useProjectStore";
import defaultData from "@/utils/defaultData.json";

export type AddProjectProps = {
  fetchProjects: any;
};

const AddProject: React.FC<AddProjectProps> = (props) => {
  const projectDispatch = useProjectStore(state => state.dispatch);

  const emptyProject = {
    "projectName": "",
    "description": "",
    "projectJSON": {
      ...defaultData
    },
    "configJSON": {},
  }


  return (<>
    <ModalForm
      title="新增项目"
      trigger={
        <Button icon={"plus"} text={'新增'}/>
      }
      onFinish={async (values: any) => {
        console.log(39, values);
        projectDispatch.addProject({
          ...emptyProject,
          projectName: values.projectName,
          description: values.description,
        }).then(() => {
          props.fetchProjects();
        });
        return true;
      }}
    >
      <ProForm.Group>
        <ProFormText width="md"
                     name="projectName"
                     label="项目名"
                     placeholder="请输入项目名"
                     formItemProps={{
                       rules: [
                         {
                           required: true,
                           message: '不能为空',
                         },
                         {
                           max: 100,
                           message: '不能大于 100 个字符',
                         },
                       ],
                     }}
        />
      </ProForm.Group>
      <ProFormTextArea
        width="md"
        name="description"
        label="项目描述"
        placeholder="请输入项目描述"
        formItemProps={{
          rules: [
            {
              required: true,
              message: '不能为空',
            },
            {
              max: 100,
              message: '不能大于 100 个字符',
            },
          ],
        }}
      />
    </ModalForm>
  </>);
}

export default React.memo(AddProject)
