using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentMaster.BLL.DTO.dtoModels;
using StudentMaster.BLL.Helpers;
using StudentMaster.BLL.Interfaces;

namespace StudentMaster.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService  _adminService;
        private readonly IClassService _classService;


        public AdminController(IAdminService adminService, IClassService classService)
        {
            _adminService = adminService;
            _classService = classService;
        }

        [HttpGet("get-all-classes")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> getAllClasses()
        {
            Thread.Sleep(2000);
    
            return Ok(await _adminService.getAllClasses());
        }

        [HttpGet("invite-user/{email}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> inviteUser(string email)
        {
            Thread.Sleep(1000);
            try
            {
                if (await _adminService.inviteUser(email))
                    return Ok(new { msg = "Ok" });
                else
                    return BadRequest();
            }
            catch (Exception e)
            {

                return BadRequest(e.Data["ERROR"]);
            }
        }
        [HttpGet("invite-user/{email}/{classId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> inviteUser(string email, int classId)
        {
            Thread.Sleep(1000);
            try
            {
                if (await _adminService.inviteUser(email, classId))
                    return Ok(new { msg = "Ok" });
                else
                    return BadRequest();
            }
            catch (Exception e)
            {

                return BadRequest(e.Data["ERROR"]);
            }

        }

        [HttpGet("remove-student-from-class/{studentId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> removeStudentFromClass(string studentId)
        {
            Thread.Sleep(1000);
            try
            {
                if (await _adminService.removeStudentFromClass(studentId))
                    return Ok(new { msg = "Ok" });
                else
                    return BadRequest();
            }
            catch (Exception e)
            {

                return BadRequest(e.Data["ERROR"]);
            }

        }

        [HttpGet("edit-subjects-in-class/{classId}/{subjectId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> editSubjectsInClass(int classId, int subjectId)
        {
            try
            {
                if (await _adminService.editSubjectsInClass(classId, subjectId))
                    return Ok(new { msg = "Ok" });
                else
                    return BadRequest();
            }
            catch (Exception e)
            {

                return BadRequest(e.Data["ERROR"]);
            }

        }
        [HttpGet("get-all-subjects")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> getAllSubjects()
        {

            return Ok(await _adminService.getAllSubjects());
        }
        [HttpGet("get-class-subjects/{classId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> getClassSubjects(int classId)
        {

            return Ok(await _adminService.getClassSubjects(classId));
        }

        [HttpGet("get-all-teachers")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> getAllTeachers()
        {

            return Ok(await _adminService.getAllTeachers());
        }
        [HttpGet("get-class-teachers/{teacherId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> getClassTeachers(int teacherId)
        {

            return Ok(await _adminService.getClassTeachers(teacherId));
        }
        [HttpGet("get-teacher-subjects/{teacherId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> getTeacherSubjects(string teacherId)
        {

            return Ok(await _adminService.getTeacherSubjects(teacherId));
        }
        [HttpGet("get-all-users/{page}/{count}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> getClassTeachers(int page, int count = 10)
        {

            return Ok(await _adminService.getUsers(page, count));
        }
      

        [HttpGet("get-all-roles")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> getAllRoles()
        {

            return Ok(await _adminService.getAllRoles());
        }
        [HttpGet("get-user-roles/{uid}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> getUserRoles(string uid)
        {

            return Ok(await _adminService.getUserRoles(uid));
        }
        [HttpGet("get-student-classes/{uid}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> getStudentClasses(string uid)
        {

            return Ok(await _adminService.getStudentClassAndAllClasses(uid));
        }

        [HttpGet("create-class/{name}")]
        [Authorize(Roles = "Admin")]
        public IActionResult createClass(string name)
        {

            try
            {
                _classService.createClass(name);
                return Ok(new { msg = "Ok" });
            }
            catch (Exception)
            {
                return BadRequest(ErrorHelper.GetException("Клас [" + name + "] вже iснує", "red", "Помилка").Data["ERROR"]);
            }
        }

        [HttpGet("delete-class/{name}")]
        [Authorize(Roles = "Admin")]
        public IActionResult deleteClass(string name)
        {

            try
            {
                _classService.removeClass(name);
                return Ok(new { msg = "Ok" });
            }
            catch (Exception)
            {
                return BadRequest(ErrorHelper.GetException("Ми не змогли видалити клас [" + name + "] ", "red", "Помилка").Data["ERROR"]);
            }
        }

        [HttpGet("change-class-name/{oldName}/{newName}")]
        [Authorize(Roles = "Admin")]
        public IActionResult changeClassName(string oldName, string newName)
        {

            try
            {
                _classService.changeNameClass(oldName, newName);
                return Ok(new { msg = "Ok" });
            }
            catch (Exception)
            {
                return BadRequest(ErrorHelper.GetException("Клас [" + oldName + "] не знайдено або клас [" + newName + " уже iснує]", "Error").Data["ERROR"]);
            }
        }

        [HttpGet("edit-teachers-in-class/{classId}/{teacherId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> editTeachersInClass(int classId, string teacherId)
        {
            try
            {
                if (await _adminService.editTeachersInClass(classId, teacherId))
                    return Ok(new { msg = "Ok" });
                else
                    return BadRequest();
            }
            catch (Exception e)
            {

                return BadRequest(e.Data["ERROR"]);
            }

        }
        [HttpGet("edit-class-in-student/{classId}/{studentId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> editClassInStudent(int classId, string studentId)
        {
            try
            {
                if (await _adminService.editStudentClass(classId, studentId))
                    return Ok(new { msg = "Ok" });
                else
                    return BadRequest();
            }
            catch (Exception e)
            {

                return BadRequest(e.Data["ERROR"]);
            }

        }
        [HttpGet("edit-subjects-in-teacher/{subjectId}/{teacherId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> editSubjectsInTeacher(int subjectId, string teacherId)
        {
            try
            {
                if (await _adminService.editSubjectsInTeacher(subjectId, teacherId))
                    return Ok(new { msg = "Ok" });
                else
                    return BadRequest();
            }
            catch (Exception e)
            {

                return BadRequest(e.Data["ERROR"]);
            }

        }
        [HttpGet("remove-new/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> removeNew(int id)
        {
            try 
            {
                _adminService.removeNew(id);
                return Ok();
            }
            catch (Exception e)
            {

                return BadRequest(e.Data["ERROR"]);
            }

        }
        [HttpPost("add-new")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> addNew(addNewViewModel model)
        {
            try
            {
                _adminService.addNew(model);
                return Ok();
            }
            catch (Exception e)
            {

                return BadRequest(e.Data["ERROR"]);
            }

        }
        [HttpGet("edit-roles-in-user/{uid}/{role}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> editRolesInUser(string uid, string role)
        {
            Thread.Sleep(1500);
            try
            {
                if (await _adminService.editRoleOfUser(uid, role))
                    return Ok(new { msg = "Ok" });
                else
                    return BadRequest("Error");
            }
            catch (Exception e)
            {

                return BadRequest(e.Data["ERROR"]);
            }

        }
    }
}