package com.ilab.service.constant;

public class EnvConstant {

    /**
     * 课件地址
     */
    public static final String COURSEWARE_PATH = "https://uniplore.feishu.cn/docx/LECYdMhpBoI3iZxYl8ScyxJOnff";

    /**
     * gotty 地址
     */
    public static final String GOTTY_PATH = "https://192.168.103.121:9000/?arg={namespace}&arg={podName}&arg=%2fbin%2fbash";

    /**
     * VNC 地址
     */
    public static final String VNC_PATH = "http://192.168.103.66:6080/";

    /**
     * Jupyter 地址
     */
    public static final String JUPYTER_PATH = "http://192.168.103.66:8888/notebooks/jupyter/main.ipynb";

    /**
     * DEFAULT_JAVA
     */
    public static final String DEFAULT_JAVA =
        "/******************************************************************************\n" +
        "\n" +
        "                             iLab 平台云端代码编辑器.\n" +
        "               输入你的代码，然后点击后上角的\"运行\"按钮执行你的代码.\n" +
        "\n" +
        "*******************************************************************************/\n" +
        "\n" +
        "public class Main\n" +
        "{\n" +
        "\tpublic static void main(String[] args) {\n" +
        "\t\tSystem.out.println(\"Hello World\");\n" +
        "\t}\n" +
        "}\n";

    /**
     * 远程编程环境
     */
    public static final String EDITOR = "editor";

    /**
     * 远程桌面环境
     */
    public static final String DESKTOP = "desktop";

    /**
     * 远程命令行环境
     */
    public static final String TERMINAL = "terminal";

    /**
     * 远程jupyter环境
     */
    public static final String JUYPTER = "juypter";

}
