## 显示 SAP Fiori Elements-List Report Object Page 模板
### 预览
* Scarr List 界面

![image](https://github.com/Taking1998/FIORI/assets/66160588/b9ec5b05-8b9b-46d1-8b37-9f049fdaf626)
* Scarr Object 界面

![image](https://github.com/Taking1998/FIORI/assets/66160588/40c00256-4876-4c68-b12d-9538f5194ed4)
* Sflight Object 界面

![image](https://github.com/Taking1998/FIORI/assets/66160588/a6bc5203-3748-401f-9754-2f39d122238d)

---

### 先决条件
* SAP_BASIS 750
* JDK1.8
* Eclipse
* SAP Web IDE
* SAP GUI
* 压缩包下载至本系统

### 操作步骤
#### 1. SAP Web IDE
* 打开 SAP Web IDE 并登录，然后点击File->Import->From File System

![image](https://github.com/Taking1998/FIORI/assets/66160588/0e85d72d-c445-4a47-907d-8a44c5907f62)

* 弹出 Import 会话框，点击 Browse 按钮

![image](https://github.com/Taking1998/FIORI/assets/66160588/29794484-5fce-4cbd-b02f-5b4cf23af6a6)

* 选择下载至本系统的 zlp_flight.zip 压缩包

![image](https://github.com/Taking1998/FIORI/assets/66160588/59a71528-16b5-4d9d-99e4-cbad0a2ab735)

* 默认设置，点击 OK 按钮

![image](https://github.com/Taking1998/FIORI/assets/66160588/73a33c11-400c-4a3f-ac03-01d55d46f6c1)

* 导入成功后的项目结构

![image](https://github.com/Taking1998/FIORI/assets/66160588/bb118118-14cd-4f32-9134-f553d52579c0)
#### 2. Eclipse
* 打开 Eclipse 并登录，找到 Data Definitions 节点，右击后点 New Data Definition

![image](https://github.com/Taking1998/FIORI/assets/66160588/19e720fa-c074-458a-8145-34162e445f3c)

* 解压缩 cds_view.zip 压缩包，根据文件名进行创建

![image](https://github.com/Taking1998/FIORI/assets/66160588/e5b7895c-5d01-4c21-92a0-71d7d78a18b4)

* 创建完成后并激活，如下图所示

![image](https://github.com/Taking1998/FIORI/assets/66160588/4c6371be-f35b-4f7c-b401-47c2bad1f3aa)

#### 3. SAP GUI
* 打开 SAP GUI 并登录，输入事务码 SEGW，点击 ![image](https://github.com/Taking1998/FIORI/assets/66160588/ca916678-6db8-47aa-a3f6-8b6673ccde62) 按钮，弹出 Create Project 会话框

![image](https://github.com/Taking1998/FIORI/assets/66160588/9086ee18-6bdd-4375-9525-1960a1450f0c)
* 填写完 Project 和 Description 后，其他保持默认设置，点击 Local Object 按钮

![image](https://github.com/Taking1998/FIORI/assets/66160588/f72e4770-fe20-43f3-aa55-419bd885f752)
* 双击打开新建的项目，右击 Data Model->Reference->Data Source，输入 CDS-Entity，点击 Next 按钮

![image](https://github.com/Taking1998/FIORI/assets/66160588/0934e810-dd83-4b0c-953a-3209992e8411)
* 将可编辑的复选按钮都打√，点击 Finish 按钮

![image](https://github.com/Taking1998/FIORI/assets/66160588/fc4ff24f-5e80-4e9d-9892-c5bb7353fb5d)
* 展开 Data Source References->Exposures via SADL，双击 CDS-Entity Exposures，点击 Add CDS-Entity 按钮，输入 ZI_SFLIGHT 点击 √ 按钮

![image](https://github.com/Taking1998/FIORI/assets/66160588/2a10ffdc-e036-44e8-b0c9-91922e567f09)
* 选中项目，点击 ![image](https://github.com/Taking1998/FIORI/assets/66160588/f62a1722-16ce-4e3a-93ee-4fcee7e26f0c) 按钮

![image](https://github.com/Taking1998/FIORI/assets/66160588/6c3a7b65-3b01-4070-b51b-93770ed0d857)
* 使用事务码 /IWFND/MAINT_SERVICE 添加这个服务，添加成功后如下图所示，一定要有 System Aliaes

![image](https://github.com/Taking1998/FIORI/assets/66160588/ca590891-aee1-400b-95ea-d58a15cdb213)

### 显示
* 打开 SAP Web IDE，选中项目，点击运行按钮

![image](https://github.com/Taking1998/FIORI/assets/66160588/a1f15bdb-0d74-4cb7-94c1-5971ad41fcaf)
* 进入到以下界面，点击磁贴即可运行项目

![image](https://github.com/Taking1998/FIORI/assets/66160588/e494d5fe-d429-4785-a23c-8e703f80070c)








