package com.ilab.service.service;

import com.ilab.service.domain.UserCourse;

import java.util.List;

/**
 * 【请填写功能名称】Service接口
 *
 * @author ruoyi
 * @date 2022-10-21
 */
public interface IUserCourseService
{
    /**
     * 查询【请填写功能名称】
     *
     * @param userId 【请填写功能名称】主键
     * @return 【请填写功能名称】
     */
    public UserCourse selectUserCourseByUserId(Long userId);

    /**
     * 查询【请填写功能名称】列表
     *
     * @param userCourse 【请填写功能名称】
     * @return 【请填写功能名称】集合
     */
    public List<UserCourse> selectUserCourseList(UserCourse userCourse);

    /**
     * 新增【请填写功能名称】
     *
     * @param userCourse 【请填写功能名称】
     * @return 结果
     */
    public int insertUserCourse(UserCourse userCourse);

    /**
     * 修改【请填写功能名称】
     *
     * @param userCourse 【请填写功能名称】
     * @return 结果
     */
    public int updateUserCourse(UserCourse userCourse);

    /**
     * 批量删除【请填写功能名称】
     *
     * @param userIds 需要删除的【请填写功能名称】主键集合
     * @return 结果
     */
    public int deleteUserCourseByUserIds(Long[] userIds);

    /**
     * 删除【请填写功能名称】信息
     *
     * @param userId 【请填写功能名称】主键
     * @return 结果
     */
    public int deleteUserCourseByUserId(Long userId);
}
