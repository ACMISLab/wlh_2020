package com.ilab.service.controller;

import com.alibaba.fastjson.JSONObject;
import com.ilab.service.dto.CourseChapterDTO;
import com.ilab.service.dto.LabEnvDTO;
import com.ilab.service.service.ILabEnvService;
import com.ilab.service.util.OnlineJavaCompiler;
import com.ruoyi.common.core.web.domain.AjaxResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@CrossOrigin
@RequestMapping("/iLabEnv")
public class LabEnvController {

    @Autowired()
    private ILabEnvService iLabEnvService;

    @PostMapping("/getEnvPath")
    public AjaxResult getEnvPath(@RequestBody JSONObject params) {
        CourseChapterDTO chapterDTO = JSONObject.toJavaObject(params, CourseChapterDTO.class);

        LabEnvDTO labEnvDTO = iLabEnvService.getLabEnv(chapterDTO);

        return AjaxResult.success(labEnvDTO);
    }

    @PostMapping("/saveEditorCode")
    public AjaxResult saveEditorCode(@RequestBody JSONObject params) {
        CourseChapterDTO chapterDTO = JSONObject.toJavaObject(params, CourseChapterDTO.class);

        Boolean labEnvDTO = iLabEnvService.updateLabEnv(chapterDTO);

        return AjaxResult.success(labEnvDTO);
    }

    @PostMapping("/runEditorCode")
    public AjaxResult runEditorCode(@RequestBody JSONObject params) throws IOException {
        CourseChapterDTO chapterDTO = JSONObject.toJavaObject(params, CourseChapterDTO.class);

        String output = OnlineJavaCompiler.compiler(chapterDTO.getInitCode());

        return AjaxResult.success(output);
    }

}
