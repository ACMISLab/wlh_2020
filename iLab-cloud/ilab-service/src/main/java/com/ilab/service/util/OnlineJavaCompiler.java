package com.ilab.service.util;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 * @author TUF
 */
public class OnlineJavaCompiler {

    public static String compiler(String code) throws IOException {
        code = code.replace("args[0]", "C:\\Users\\TUF\\Desktop\\t8.shakespeare.txt");

        StringBuilder output = new StringBuilder();

        String fileName = "Main.java";
        BufferedWriter writer = new BufferedWriter(new FileWriter(fileName));
        writer.write(code);
        writer.close();
        Process compileProcess = Runtime.getRuntime().exec("javac " + fileName);
        try {
            compileProcess.waitFor();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        if (compileProcess.exitValue() == 0) {
            Process runProcess = Runtime.getRuntime().exec("java Main");
            BufferedReader reader = new BufferedReader(new InputStreamReader(runProcess.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
                output.append(line);
                output.append("\n");
            }
            reader.close();
        } else {
            System.out.println("Compilation failed.");
        }

        return output.toString();
    }
}
