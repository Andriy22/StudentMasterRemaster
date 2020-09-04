using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.SignalR;
using StudentMaster.API.Hubs.models;
using StudentMaster.BLL.Interfaces;
using StudentMaster.BLL.Services;
using StudentMaster.DAL.Entities;
using StudentMaster.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace StudentMaster.API.Hubs
{
    [EnableCors("signalr")]
    public class ConsoleHub: Hub
    {
        List<Command> commands;
        private readonly IClassService _classService;
        private readonly IAdminService _adminService;
        public ConsoleHub(IClassService classService, IAdminService adminService)
        {
            this.commands = new List<Command>();
            _classService = classService;
            _adminService = adminService;
            commands.Add(new Command() { command = "/help", description = "'Список команд'" });
            // commands.Add(new Command() { command = "/add-class class_name", description = "'Створити новий клас'" });
            // commands.Add(new Command() { command = "/remove-class class_name", description = "'Видалити клас'" });
            commands.Add(new Command() { command = "/rollback-class class_name", description = "'Відновити клас'" });
            // commands.Add(new Command() { command = "/change-class-name old_name new_name", description = "'Змінити назву класу.'" });
            commands.Add(new Command() { command = "/add-subject subject_name", description = "'Додати предмет'" });
            commands.Add(new Command() { command = "/edit-subject subject_name new_subject_name", description = "'Змінити назву предмета'" });
            commands.Add(new Command() { command = "/rollback-subject subject_name", description = "'Відновити предмет'" });
            commands.Add(new Command() { command = "/remove-subject subject_name", description = "'Видалити предмет'" });
        }

        [Authorize(Roles = "Admin")]
        public async Task Execute(string command)
        {
            var cmd = command.Split(' ');
            await sendMessageAsync($"Команду [ {command} ] отримано. Опрацьовуємо...", "orange");

            Thread.Sleep(500);

            if (cmd[0].ToLower() == "/help")
            {
               
                foreach (var el in commands)
                {
                    var msg = el.command + " | " + el.description;
                    await sendMessageAsync(msg);
                }
              
            }
            else 
            if (cmd[0].ToLower() == "/add-class")
            {
                if (String.IsNullOrEmpty(cmd[1]))
                    await sendMessageAsync($"Назва класу не може бути пустою", "red");
                try
                {
                    _classService.createClass(cmd[1]);
                    await sendMessageAsync("Клас створено!");
                } catch (Exception)
                {
                    await sendMessageAsync($"Назва [" + cmd[1] + "] вже використовується", "red");
                }
            }
            else
            if (cmd[0].ToLower() == "/remove-class")
            {
                if (String.IsNullOrEmpty(cmd[1]))
                    await sendMessageAsync($"Назва класу не може бути пустою", "red");
                try
                {
                    _classService.removeClass(cmd[1]);
                    await sendMessageAsync("Клас видалено!");
                }
                catch (Exception)
                {
                    await sendMessageAsync($"Клас з назвою [" + cmd[1] + "] не знайдено", "red");
                }
            }
            else
            if (cmd[0].ToLower() == "/rollback-class")
            {
                if (String.IsNullOrEmpty(cmd[1]))
                    await sendMessageAsync($"Назва класу не може бути пустою", "red");
                try
                {
                    _classService.rollbackClass(cmd[1]);
                    await sendMessageAsync("Клас відновлено!");
                }
                catch (Exception)
                {
                    await sendMessageAsync($"Клас з назвою [" + cmd[1] + "] не знайдено", "red");
                }
            }
            else
            if (cmd[0].ToLower() == "/change-class-name")
            {
                if (String.IsNullOrEmpty(cmd[1] + cmd[2]))
                    await sendMessageAsync($"Назва класу не може бути пустою", "red");
                try
                {
                    _classService.changeNameClass(cmd[1], cmd[2]);
                    await sendMessageAsync("Клас оновлено!");
                }
                catch (Exception)
                {
                    await sendMessageAsync($"Клас з назвою [" + cmd[1] + "] не знайдено", "red");
                }
            }
            else
            if (cmd[0].ToLower() == "/add-subject")
            {
                if (String.IsNullOrEmpty(cmd[1]))
                    await sendMessageAsync($"Назва предмету не може бути пустою", "red");
                try
                {
                    _adminService.createSubject(cmd[1]);
                    await sendMessageAsync("Предмет створено!");
                }
                catch (Exception)
                {
                    await sendMessageAsync($"Предмет з назвою [" + cmd[1] + "] вже існує", "red");
                }
            }
            else
            if (cmd[0].ToLower() == "/remove-subject")
            {
                if (String.IsNullOrEmpty(cmd[1]))
                    await sendMessageAsync($"Назва предмету не може бути пустою", "red");
                try
                {
                    _adminService.createSubject(cmd[1]);
                    await sendMessageAsync("Предмет видалено!");
                }
                catch (Exception)
                {
                    await sendMessageAsync($"Предмет [" + cmd[1] + "] не знайдено", "red");
                }
            }
            else
            if (cmd[0].ToLower() == "/rollback-subject")
            {
                if (String.IsNullOrEmpty(cmd[1]))
                    await sendMessageAsync($"Назва предмету не може бути пустою", "red");
                try
                {
                    _adminService.rollbackSubject(cmd[1]);
                    await sendMessageAsync("Предмет відновлено!");
                }
                catch (Exception)
                {
                    await sendMessageAsync($"Предмет [" + cmd[1] + "] не знайдено", "red");
                }
            }
            else
            if (cmd[0].ToLower() == "/edit-subject")
            {
                if (String.IsNullOrEmpty(cmd[1] + cmd[2]))
                    await sendMessageAsync($"Назва предмету не може бути пустою", "red");
                try
                {
                    _adminService.changeNameSubject(cmd[1], cmd[2]);
                    await sendMessageAsync("Предмет оновлено!");
                }
                catch (Exception)
                {
                    await sendMessageAsync($"Предмет [" + cmd[1] + "] не знайдено", "red");
                }
            }
            else
            if (cmd[0].ToLower() == "/ping")
            {
                await sendMessageAsync("Pong", "orange");
            }
            else
            {
                    await sendMessageAsync($"Команду {cmd[0]} не знайдено...", "red");
                    await sendMessageAsync($"Спробуйте використати '/help' щоб переглянути всі команди консолі", "red");
            }
        }
        public async Task sendMessageAsync(string message, string color = "magenta") {

            var msg = new models.ChatMessage()
            {
                color = color,
                date = DateTime.Now.ToLongDateString(),
                message = message,
                senderPib = "@console"
            };
            await Clients.User(Context.User.Identity.Name).SendAsync("reciveCmd", msg);
        }
    }
}
