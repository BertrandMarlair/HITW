import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

if (Meteor.isServer) {
  Meteor.publish('allUsers', function (role) {
    if (role === 'admin') {
      return Meteor.users.find({ "profile.archived": { $ne: "Archived" }, "profile.role": { $ne: "admin" } }, { fields: { emails: 1, profile: 1, attendances: 1, event: 1, assiduity: 1 } })
    } else {
      return Meteor.users.find({ _id: this.userId }, { fields: { emails: 1, profile: 1, notifications: 1, attendances: 1, event: 1 } })
    }
  })
  Meteor.publish('userById', function (role, userId) {
    if (role === 'admin') {
      return Meteor.users.find({_id: userId}, { fields: { emails: 1, profile: 1, inside: 1} })
    } else {
      return Meteor.users.find({ _id: this.userId })
    }
  })
  Meteor.publish('allUsersEvaluation', function (role) {
    if (role === 'admin') {
      return Meteor.users.find({ "profile.archived": { $ne: "Archived" }, "profile.role": { $ne: "admin" } })
    } else {
      return Meteor.users.find({ _id: this.userId }, { fields: { emails: 1, profile: 1, notifications: 1, attendances: 1, event: 1 } })
    }
  })
  Meteor.publish('allUsersMember', function (role) {
    if (role === 'admin') {
      return Meteor.users.find({ "profile.archived": { $ne: "Archived" }, "profile.role": { $ne: "admin" } } , { fields: { emails: 1, profile: 1, attendances: 1, event: 1 } })
    } else {
      return Meteor.users.find({ _id: this.userId }, { fields: { emails: 1, profile: 1, notifications: 1, attendances: 1, event: 1 } })
    }
  })
  Meteor.publish('enterpriseNotConnect', function (role) {
    if (role === 'admin') {
      return Meteor.users.find({ "profile.archived": { $ne: "Archived" }, "profile.role": { $ne: "admin" } }, {})
    } else {
      return Meteor.users.find({ _id: this.userId }, {})
    }
  })
  Meteor.publish('allUsersInfo', function (info) {
    if (info.role === 'admin') {
      return Meteor.users.find({}, { fields: { emails: 1, profile: 1, event: 1, inside: 1, assiduity: 1 } })
    } else {
      return Meteor.users.find({ _id: this.userId }, { fields: { emails: 1, profile: 1, event: 1, inside: 1, assiduity: 1 } })
    }
  })
  Meteor.publish('allEnterpriseInfo', function (info) {
    if (info.role === 'admin') {
      return Meteor.users.find({ _id: info.id, "profile.archived": { $ne: true } })
    } else {
      return Meteor.users.find({ _id: this.userId }, { fields: { emails: 1, profile: 1, event: 1 } })
    }
  })
  Meteor.publish('allUsersInfoDashboardAll', function (role) {
    if (role === 'admin') {
      return Meteor.users.find({}, { fields: { emails: 1, profile: 1, assiduity: 1 } })
    } else {
      return Meteor.users.find({ _id: this.userId }, { fields: { emails: 1, profile: 1 } })
    }
  })
  Meteor.publish('allUsersInfoDashboard', function (role) {
    if (role === 'admin') {
      return Meteor.users.find({"profile.role": { $ne: "admin" }, "profile.archived": { $ne: "Archived" }}, { fields: { emails: 1, profile: 1 } })
    } else {
      return Meteor.users.find({ _id: this.userId }, { fields: { emails: 1, profile: 1 } })
    }
  })
  Meteor.publish('allUsersInfoDashboardTimesheet', function (role) {
    if (role === 'admin') {
      return Meteor.users.find({"profile.role": { $ne: "admin" }, "profile.archived": { $ne: "Archived" }}, { fields: { emails: 1, profile: 1 } })
    } else {
      return Meteor.users.find({ _id: this.userId }, { fields: { emails: 1, profile: 1 } })
    }
  })
  Meteor.publish('allUsersInfoAttendances', function (role) {
    if (role === 'admin') {
      return Meteor.users.find({"profile.role": { $ne: "admin" }, "profile.archived": { $ne: "Archived" }, "attendances.justify" : ""}, { fields: { emails: 1, profile: 1, attendances: 1 } })
    } else {
      return Meteor.users.find({ _id: this.userId }, { fields: { emails: 1, profile: 1 } })
    }
  })
  Meteor.publish('allUsersAbsences', function (role) {
    if (role === 'admin') {
      return Meteor.users.find({"profile.role": { $ne: "admin" }, "profile.archived": { $ne: "Archived" }, "profile.archived": { $ne: true } } )
    } else {
      return Meteor.users.find({ _id: this.userId }, { fields: { emails: 1, profile: 1, absences: 1 } })
    }
  })
  Meteor.publish('userName', function (role) {
    if (role === 'admin') {
      return Meteor.users.find({"profile.archived": { $ne: true }})
    } else {
      return Meteor.users.find({ _id: this.userId }, { fields: { profile: 1 } })
    }
  })
  Meteor.publish('userByIdTimesheet', function (role, userId) {
    if (role === 'admin') {
      return Meteor.users.find({_id: userId}, { fields: { attendances: 1} })
    } else {
      return Meteor.users.find({ _id: this.userId })
    }
  })
  Meteor.publish('ownUser', function () {
    return Meteor.users.find({ '_id': this.userId })
  })

  Meteor.publish('enterprise', function () {
    return Meteor.users.find({ "profile.role": "enterprise" }, { fields: { emails: 1, profile: 1, tracer: 1, contact: 1, internship: 1, job: 1 } })
  })

  Meteor.publish('connectedUser', function () {
    return Meteor.users.find({ _id: this.userId }, { fields: { emails: 1, profile: 1, event: 1, absences: 1 } })
  });

  Meteor.publish('users', function () {
    return Meteor.users.find({"profile.archived": { $ne: true }}, { fields: { profile: 1, notifications: 1 } })
  });

  Meteor.publish('userApi', function () {
    return Meteor.users.find({"profile.archived": { $ne: true }}, { fields: { profile: 1, notifications: 1 } })
  });
  Meteor.methods({
    'ChangePassword'(login, password) {
      Accounts.setPassword(login, password);
    },
    'user.absences'(date, cause) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
      check(date, String);
      check(cause, String);
      Project.update(
        { _id: this.userId },
        { $push: { 'absences': date } }
      );
    },
    'user.presences'(userId, presence) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
      check(userId, String);
      const user = Meteor.users.find({ _id: userId }).fetch();
      if (user.length > 0) {
        let presences = user[0].presences;
        let existDate = false;
        let existTime = false;
        for (let i in presences) {
          if (presences[i].date == presence.date) {
            existDate = true;
            if (presences[i].time.toString() !== presence.time.toString() || presences[i].comment !== presence.comment) {
              existTime = true;
            }
            if (presences[i].justify === true || presences[i].justify === false) {
              existTime = false;
            }
          }
        }
        if (existDate) {
          if (existTime) {
            Meteor.users.update(
              { _id: userId },
              { $pull: { 'presences': { date: presence.date } } }
            );
            Meteor.users.update(
              { _id: userId },
              { $push: { 'presences': presence } }
            );
          }
        } else {
          Meteor.users.update(
            { _id: userId },
            { $push: { 'presences': presence } }
          );
        }
      }
    },
    'user.notif'(userId, notif, link) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
      check(userId, String);
      check(notif, String);
      check(link, String);
      Meteor.users.update(
        { _id: userId },
        {
          $push: {
            'profile.notifications': {
              'notif': notif,
              'link': link,
              'createdAt': new Date(),
            }
          }
        }
      );
    },
    'user.notifMultiple'(userIdArray, notif, link) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
      check(userIdArray, Array);
      check(notif, String);
      check(link, String);
      for (let i in userIdArray) {
        Meteor.users.update(
          { _id: userIdArray[i] },
          {
            $push: {
              'profile.notifications': {
                'notif': notif,
                'link': link,
                'createdAt': new Date(),
              }
            }
          }
        );
      }
    },
    'deleteNotification'() {
      if (!Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
      Meteor.users.update(
        { _id: this.userId },
        { $set: { 'profile.notifications': [] } }
      );
    },
    'deleteNotificationOne'(date) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
      Meteor.users.update(
        { _id: this.userId },
        { $pull: { 'profile.notifications' : { 'createdAt' : date} } }
      );
    },
    'event.add'(event, nameForm, date, title) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
      Meteor.users.update(
        { _id: this.userId },
        {
          $push:{
            "event" : {
                _id: Date.now(),
                eventId: event,
                name: nameForm,
                date,
                title,
            }
          }
        }
      );
    },
    'event.delete'(eventId) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
      Meteor.users.update(
        { _id: this.userId },
        { $pull: { 'event': { '_id': eventId } } }
      );
    },
    'event.addOrther'(userId, event, nameForm, title, date) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
      Meteor.users.update(
        { _id: userId },
        {
          $push:{
            "event" : {
                _id: Date.now(),
                eventId: event,
                name: nameForm,
                date, 
                title
            }
          }
        }
      );
    },
    'event.deleteOrther'(userId, eventId) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
      Meteor.users.update(
        { _id: userId },
        { $pull: { 'event': { '_id': eventId } } }
        );
      },
      'assiduity.addOrther'(userId, title, date) {
        if (!Meteor.userId()) {
          throw new Meteor.Error('not-authorized');
        }
        Meteor.users.update(
          { _id: userId },
          {
            $push:{
              "assiduity" : {
                  _id: Date.now(),
                  date: date,
                  title: title,
              }
            }
          }
        );
      },
    'assiduity.deleteOrther'(userId, assiduityId) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
      Meteor.users.update(
        { _id: userId },
        { $pull: { 'assiduity': { '_id': assiduityId } } }
      );
    },
    'absence.insert'(date, cause, justificatif, type, link) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
      const user = Meteor.users.find({ _id: this.userId }).fetch();
      if (user.length > 0) {
        let absences = user[0].absences;
        let existDate = false;
        for (let i in absences) {
          if (absences[i].date === date) {
            existDate = true;
          }
        }
        if (!existDate) {
          Meteor.users.update(
            { _id: this.userId },
            {
              $push: {
                absences: {
                  date,
                  cause,
                  justificatif,
                  type,
                  link,
                  justify: "",
                  dateId: new Date().getTime(),
                }
              }
            })
        } else {
          throw new Meteor.Error('Already added to this date :' + date);
        }
      }
    },
    'presence.editingTimesheet'(userId, date, newTimer) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
      Meteor.users.update(
        { _id: userId, "presences.date": date },
        {
          $set: {
            "presences.$.time": newTimer
          }
        })
    },
    'absence.editingTimesheet'(userId, date, newTimer, newType, dateId) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
      Meteor.users.update(
        { _id: userId, "absences.date": date, "absences.dateId": dateId },
        {
          $set: {
            "absences.$.time": newTimer,
            "absences.$.type": newType
          }
        })
    },
    'absenceEvent.insert'(date, time, cause, justificatif, type, link) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
      const user = Meteor.users.find({ _id: this.userId }).fetch();
      if (user.length > 0) {
        let absences = user[0].absences;
        let existDate = false;
        for (let i in absences) {
          if (absences[i].date === date) {
            existDate = true;
          }
        }
        if (!existDate) {
          Meteor.users.update(
            { _id: this.userId },
            {
              $push: {
                absences: {
                  date,
                  time,
                  cause,
                  justificatif,
                  type,
                  link,
                  justify: "",
                  event: true,
                  dateId: new Date().getTime(),
                }
              }
            })
        } else {
          throw new Meteor.Error('Already added to this date :' + date);
        }
      }
    },
    'absenceMultiple.insert'(date, time, cause, justificatif, type, link) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
      const user = Meteor.users.find({ _id: this.userId }).fetch();
      if (user.length > 0) {
        let absences = user[0].absences;
        let existDate = [];
        let exist = false;
        for (let i in absences) {
          if (absences[i].date === date) {
            existDate.push(absences[i]);
            exist = true;
          }
        }
        if (!exist) {
          Meteor.users.update(
            { _id: this.userId },
            {
              $push: {
                absences: {
                  date,
                  time,
                  cause,
                  justificatif,
                  type,
                  link,
                  justify: "",
                  dateId: new Date().getTime(),
                }
              }
            }
          )
        } else if (existDate.length === 1) {
          if(type !== 'multiple'){
            if (existDate[0].type !== type) {
              Meteor.users.update(
                { _id: this.userId },
                {
                  $push: {
                    absences: {
                      date,
                      time,
                      cause,
                      justificatif,
                      type,
                      link,
                      justify: "",
                      dateId: new Date().getTime(),
                    }
                  }
                }
              )
            } else {
              throw new Meteor.Error('Already added ' + existDate[0].type + ' ' + existDate[0].time + ' to this date :' + date);
            }
          }else{
            throw new Meteor.Error('Already added a absence for all day to this date :' + date);
          }
        } else {
          throw new Meteor.Error('Already added to this date :' + date);
        }
      }
    },
    'test'(id, date) {
      Meteor.users.update(
        { _id: id, "absences.date": date },
        {
          $set:
          {
            "absences.$.dateId": new Date().getTime(),
          }
        }
      );
    },
    'absence.justify'(_id, justify, type) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
      if (justify.absence[2] !== "") {
        Meteor.users.update(
          { _id: _id, "absences.date": justify.absence[2].date, "absences.dateId": justify.absence[2].dateId },
          {
            $set:
            {
              "absences.$.justify": true
            }
          }
        );
      }
      if (justify.absence[1] !== "") {
        Meteor.users.update(
          { _id: _id, "presences.date": justify.absence[1].date },
          {
            $set:
            {
              "presences.$.justify": true
            }
          }
        );
      }
      Meteor.users.update(
        { _id: _id },
        {
          $push:
          {
            "justify": [justify.absence[0], type, justify.absence[2].dateId],
          }
        }
      )
    },
    'absence.editJustify'(_id, absence, justified) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
      if (absence) {
        let type = absence.type == "Come at" || absence.type == "Leave at" ? "retard" : absence.type == "multiple" ? "absence" : "event";
        Meteor.users.update(
          { _id: _id, "presences.date": absence.date },
          {
            $set:
            {
              "presences.$.justify": justified
            }
          }
        );
        if(absence.dateId && absence.dateId !== ""){
          Meteor.users.update(
            { _id: _id, "absences.date": absence.date, "absences.dateId": absence.dateId },
            {
              $set:
              {
                "absences.$.justify": justified
              }
            }
          );
          Meteor.users.update(
            { _id: _id },
            {
              $pull: { "unjustify" : [ absence.date, type, absence.dateId ] }
            }
          )
          Meteor.users.update(
            { _id: _id },
            {
              $push: { "justify" : [ absence.date, type, absence.dateId ] }
            }
          )
        }else{
          Meteor.users.update(
            { _id: _id, "absences.date": absence.date},
            {
              $set:
              {
                "absences.$.justify": justified
              }
            }
          );
          Meteor.users.update(
            { _id: _id },
            {
              $pull: { "unjustify" : [ absence.date, type ] }
            }
          )
          Meteor.users.update(
            { _id: _id },
            {
              $push: { "justify" : [ absence.date, type ] }
            }
          )
        }
      }
    },
    'absence.editUnJustify'(_id, absence, justified) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
      if (absence) {
        let type = absence.type == "Come at" || absence.type == "Leave at" ? "retard" : absence.type == "multiple" ? "absence" : "event";
        Meteor.users.update(
          { _id: _id, "presences.date": absence.date },
          {
            $set:
            {
              "presences.$.justify": justified
            }
          }
        );
        if(absence.dateId && absence.dateId !== ""){
          Meteor.users.update(
            { _id: _id, "absences.date": absence.date, "absences.dateId": absence.dateId },
            {
              $set:
              {
                "absences.$.justify": justified
              }
            }
          );
          Meteor.users.update(
            { _id: _id },
            {
              $pull: { "justify" : [ absence.date, type, absence.dateId ] }
            }
          )
          Meteor.users.update(
            { _id: _id },
            {
              $push: { "unjustify" : [ absence.date, type, absence.dateId ] }
            }
          )
        }else{
          Meteor.users.update(
            { _id: _id, "absences.date": absence.date},
            {
              $set:
              {
                "absences.$.justify": justified
              }
            }
          );
          Meteor.users.update(
            { _id: _id },
            {
              $pull: { "justify" : [ absence.date, type] }
            }
          )
          Meteor.users.update(
            { _id: _id },
            {
              $push: { "unjustify" : [ absence.date, type] }
            }
          )
        }
      }
    },
    'absence.editJustifyType'(_id, absence, type) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
      if (absence && type) {
        let typeAll = absence.type == "Come at" || absence.type == "Leave at" ? "retard" : absence.type == "multiple" ? "absence" : "event";
        let typeNew = type == "Come at" || type == "Leave at" ? "retard" : type == "multiple" ? "absence" : "event";
        Meteor.users.update(
          { _id: _id, "absences.date": absence.date, "absences.dateId": absence.dateId },
          {
            $set:
            {
              "absences.$.type": type
            }
          }
        );
        if(absence.dateId && absence.dateId !== ""){
          Meteor.users.update(
            { _id: _id, "unjustify" : [absence.date, typeAll, absence.dateId] },
            {
              $set:
              {
                "unjustify.$": [absence.date, typeNew, absence.dateId]
              }
            }
          );
          Meteor.users.update(
            { _id: _id, "justify" : [absence.date, typeAll, absence.dateId]},
            {
              $set:
              {
                "justify.$": [absence.date, typeNew, absence.dateId]
              }
            }
          );
        }else{
          Meteor.users.update(
            { _id: _id, "absences.date": absence.date },
            {
              $set:
              {
                "absences.$.type": type
              }
            }
          );
          Meteor.users.update(
            { _id: _id, "unjustify" : [absence.date, typeAll ] },
            {
              $set:
              {
                "unjustify.$": [absence.date, typeNew]
              }
            }
          );
          Meteor.users.update(
            { _id: _id, "justify" : [absence.date, typeAll ] },
            {
              $set:
              {
                "justify.$": [absence.date, typeNew]
              }
            }
          );
        }
      }
    },
    'absence.newjustifylink'(link, date, dateId) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
      Meteor.users.update(
        { _id: this.userId, "absences.date": date, "absences.dateId": dateId },
        {
          $set:
          {
            "absences.$.link": link
          }
        }
      );
    },
    'absence.unJustify'(_id, justify, type) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
      if (justify.absence[2] !== "") {
        Meteor.users.update(
          { _id: _id, "absences.date": justify.absence[2].date, "absences.dateId": justify.absence[2].dateId },
          {
            $set:
            {
              "absences.$.justify": false
            }
          }
        );
      }
      if (justify.absence[1] !== "") {
        Meteor.users.update(
          { _id: _id, "presences.date": justify.absence[1].date },
          {
            $set:
            {
              "presences.$.justify": false
            }
          }
        );
      }
      Meteor.users.update(
        { _id: _id },
        {
          $push:
          {
            "unjustify": [justify.absence[0], type, justify.absence[2].dateId]
          }
        }
      )
    },
    'absence.delete'(_id, justify) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
      if (justify.absence[2] !== "") {
        Meteor.users.update(
          { _id: _id, "absences.date": justify.absence[2].date },
          {
            $set:
            {
              "absences.$.justify": "delete"
            }
          }
        );
      }
      if (justify.absence[1] !== "") {
        Meteor.users.update(
          { _id: _id, "presences.date": justify.absence[1].date },
          {
            $set:
            {
              "presences.$.justify": "delete"
            }
          }
        );
      }
    },
    'user.badge'(badge) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
      Meteor.users.update(
        { _id: this.userId },
        {
          $set: {
            'talent.badge': badge
          }
        }
      );
    },
    'user.talentInfo'(accountInfo) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
      Meteor.users.update(
        { _id: this.userId },
        {
          $set: {
            'talent.title': accountInfo.title,
            'talent.desc': accountInfo.desc,
            'talent.favoriteStack': accountInfo.stacks,
            'talent.wantedLocation': accountInfo.wantedLocation,
            'talent.projects': [
              accountInfo.project[0], 
              accountInfo.project[1], 
              accountInfo.project[2], 
            ]
          }
        }
      );
    },
    'user.talentAviability'(aviability) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
      Meteor.users.update(
        { _id: this.userId },
        {
          $set: {
            'talent.aviability': aviability,
          }
        }
      );
    },
    'user.type'(type) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
      Meteor.users.update(
        { _id: this.userId },
        {
          $set: {
            'talent.type': type
          }
        }
      );
    },
    'user.contrat'(contrat) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
      Meteor.users.update(
        { _id: this.userId },
        {
          $set: {
            'talent.contrat': contrat
          }
        }
      );
    },
    'ChangePromo'(id, promo) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
      Meteor.users.update(
        { _id: id },
        {
          $set: {
            'profile.promo_slug': promo
          }
        }
      );
    },

    'absence.addup'(absence) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
      const user = Meteor.users.find({ _id: absence.id }).fetch();
      if (user.length > 0) {
        let attendances = user[0].attendances;
        let existDate = false;
        for (let i in attendances) {
         if(attendances[i].date == absence.date){
            existDate = true;
          }
        }
        let presences = user[0].presences;
        let justify = "";
        for (let i in presences) {
         if(presences[i].date == new Date(absence.date.slice(3,5)+"/"+absence.date.slice(0,2)+"/"+absence.date.slice(6,10)).toDateString()){
            justify = presences[i].justify == true ? true : presences[i].justify == false ? false : "";
          }
        }
        if(existDate){
          Meteor.users.update(
            { _id: absence.id, "attendances.date": absence.date },{ 
              $set : {  
                "attendances.$.timesheet" : { 
                  morning: absence.morning,
                  midday: absence.midday,
                  evening: absence.evening,
                  comment: absence.comment,
                  type: absence.type,
                } 
              } 
            }
          );
        }else{
          if(justify != "delete"){
            Meteor.users.update(
              { _id: absence.id },{ 
                $push : {
                  "attendances" : { 
                    date: absence.date,
                    dateReal: new Date(absence.date.slice(3,5) + "/" + absence.date.slice(0,2) + "/" + absence.date.slice(6,10)),
                    justify: justify,
                    timesheet: {
                      morning: absence.morning,
                      midday: absence.midday,
                      evening: absence.evening,
                      comment: absence.comment,
                      type: absence.type,
                    }
                  } 
                } 
              }
            )
          }
        }
      }
    },
    'absence.editAbsenceJustification'(userId, date, just) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
      Meteor.users.update(
        { _id: userId, "attendances.date" : date},
        { $set: {"attendances.$.justify" : just} },
      );
    },
    'absence.remove'(absence) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
      Meteor.users.update(
        { _id: absence.id, "attendances.date" : absence.date},
        { $unset: {"attendances.$.timesheet" : ""} },
      );
      const user = Meteor.users.find({ _id: absence.id, "attendances.date": absence.date }).fetch();
      if(user && user.length > 0){
        let attendances = user[0].attendances;
        for (let i in attendances) {
          if(attendances[i].date == absence.date){
            if(!attendances[i].form || attendances[i].form.length == 0){
              if(!attendances[i].timesheet || attendances[i].timesheet.length == 0){
                Meteor.users.update(
                  { _id: absence.id},
                  { $pull: { attendances: { date: absence.date } } },
                );
              }
            }
          }
        }
      }
    },
    'absence.removeAbsenceForm'(idUser, id, date) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
      Meteor.users.update(
        { _id: idUser, "attendances.date": date },
        { $pull: { "attendances.$.form" : { "id" : id } } } ,
      );
      const user = Meteor.users.find({ _id: idUser, "attendances.date": date }).fetch();
      let attendances = user[0].attendances;
      for (let i in attendances) {
        if(attendances[i].date == date){
          if(!attendances[i].form || attendances[i].form.length == 0){
            if(!attendances[i].timesheet || attendances[i].timesheet.length == 0){
              Meteor.users.update(
                { _id: idUser},
                { $pull: { attendances: { date: date } } },
              );
            }
          }
        }
      }
    },
    'absence.editAbsenceForm'(userId, id, date, type, time, comment, link) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
      const user = Meteor.users.find({ _id: userId, "attendances.date": date }).fetch();
      let attendances = user[0].attendances;
      for (let i in attendances) {
        for(let j in attendances[i].form){
          let absenceForm = attendances[i].form[j];
          if(absenceForm.id == id){
            let queryType = "attendances.$.form."+j+".type";
            let queryTime = "attendances.$.form."+j+".time";
            let queryComment = "attendances.$.form."+j+".comment";
            let queryLink = "attendances.$.form."+j+".link";
            Meteor.users.update(
              { _id: userId, "attendances.date": date },{
                $set:{
                  [queryType]: type,
                  [queryTime]: time,
                  [queryComment]: comment,
                  [queryLink]: link,
                }
              }
            );
          }
        }
      }
    },
    'absence.editAbsenceFormAddAbsence'(userId, date, type, time, comment, link) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
      Meteor.users.find({ _id: userId, "attendances.date": date }).fetch();
        Meteor.users.update({ 
          _id: userId, "attendances.date": date },{
          $push : {  
            "attendances.$.form" : {
              type,
              time,
              comment,
              link
            }
          }
        }
      );
    },
    'absence.editAbsenceFormImage'(userId, id, date, link) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
      const user = Meteor.users.find({ _id: userId, "attendances.date": date }).fetch();
      let attendances = user[0].attendances;
      for (let i in attendances) {
        for(let j in attendances[i].form){
          let absenceForm = attendances[i].form[j];
          if(absenceForm.id == id){
            let queryLink = "attendances.$.form."+j+".link";
            Meteor.users.update(
              { _id: userId, "attendances.date": date },{
                $set:{
                  [queryLink]: link,
                }
              }
            );
          }
        }
      }
    },
    'absence.absenceForm'(absence) {
      if (!Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
      const user = Meteor.users.find({ _id: absence.id }).fetch();
        if (user.length > 0) {
          let attendances = user[0].attendances;
          let existDate = false;
          for (let i in attendances) {
            if(attendances[i].date == absence.date){
              existDate = true;
            }
          }
          if(existDate){
            Meteor.users.update(
              { _id: absence.id, "attendances.date": absence.date },{ 
                $push : {  
                  "attendances.$.form" : {
                    "id": Math.random(),
                    "type": absence.type,
                    "comment": absence.comment,
                    "link": absence.link,
                    "time": absence.time
                  }
                } 
              }
            );
          }else{
            Meteor.users.update(
              { _id: absence.id },{ 
                $push : {
                  "attendances" : { 
                    date: absence.date,
                    dateReal: absence.dateReal,
                    justify: absence.justify,
                    form: [{
                      id: Math.random(),
                      type: absence.type,
                      comment: absence.comment,
                      link: absence.link,
                      time: absence.time
                    }]
                  } 
                } 
              }
            )
          }
        }
      },
      'updateDeformathor'(userInformation){
        Meteor.users.update(
          { _id: userInformation.mybecodeid },{ 
            $set : {
              "inside" : { 
                ...userInformation
              } 
            } 
          }
        )
      },
    }
  );
}