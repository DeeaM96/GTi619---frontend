import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SecuritySettingsService } from '../_services/securitySettings.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content?: string;
  permission=true;

  loginSettingsForm= {
    maxLoginAttempts : '',
    maxLoginAttemptsBeforeDisable : '',
    loginRetryInterval : ''
  };
  passwordSettingsForm= {
    minLength: '',
    requireUppercase: false,
    requireLowercase: false,
    requireDigits: false,
    requireSpecial: false
  };
  passwordChangeSettingsForm={
    reuseHistory:'',
    changeInterval:''
  }

  activeTabIndex: number = 0; 


  constructor( private toastr: ToastrService, private userService: UserService,private fb: FormBuilder, private settingsService: SecuritySettingsService) {
   

  
    // Charger les paramètres existants ici
  }

  

  saveSettings(): void {
    let settings: {[key: string]: string} = {};
  
    switch (this.activeTabIndex) {
      case 0: // Login Settings Tab
        settings = {
          'MAX_LOGIN_ATTEMPTS': this.loginSettingsForm.maxLoginAttempts.toString(),
          'MAX_LOGIN_ATTEMPTS_BEFORE_DISABLE': this.loginSettingsForm.maxLoginAttemptsBeforeDisable.toString(),
          'LOGIN_RETRY_INTERVAL': this.loginSettingsForm.loginRetryInterval.toString()
        };
        break;
      case 1: // Password Settings Tab
        settings = {
          'PASSWORD_MIN_LENGTH': this.passwordSettingsForm.minLength.toString(),
          'PASSWORD_REQUIRE_UPPERCASE': this.passwordSettingsForm.requireUppercase.toString(),
          'PASSWORD_REQUIRE_LOWERCASE': this.passwordSettingsForm.requireLowercase.toString(),
          'PASSWORD_REQUIRE_DIGITS': this.passwordSettingsForm.requireDigits.toString(),
          'PASSWORD_REQUIRE_SPECIAL': this.passwordSettingsForm.requireSpecial.toString()
        };
        break;
      case 2: // Password Change Settings Tab
        settings = {
          'PASSWORD_REUSE_HISTORY': this.passwordChangeSettingsForm.reuseHistory.toString(),
          'PASSWORD_CHANGE_INTERVAL': this.passwordChangeSettingsForm.changeInterval.toString()
        };
        break;
      default:
        console.error('Invalid tab index');
        return;
    }
  
    this.settingsService.saveSettings(settings).subscribe(
      response => {
        console.log('Paramètres sauvegardés avec succès');
     
        this.toastr.success('<i class="fa fa-check-circle"></i> Paramètres sauvegardés avec succès', 'Success', {
          enableHtml: true
        });
      },
      error => {
        console.error('Erreur lors de la sauvegarde des paramètres', error);
      
     
          this.toastr.error('<i class="fa fa-times-circle"></i> Erreur lors de la sauvegarde des paramètres', 'Error', {
            enableHtml: true
          });
       
      }
    );
  }
  
  




  ngOnInit(): void {
    this.settingsService.getSettings().subscribe({
      next: settings => {
        this.loginSettingsForm = {
          maxLoginAttempts: settings['MAX_LOGIN_ATTEMPTS'],
          maxLoginAttemptsBeforeDisable: settings['MAX_LOGIN_ATTEMPTS_BEFORE_DISABLE'],
          loginRetryInterval: settings['LOGIN_RETRY_INTERVAL']
        };
        this.passwordSettingsForm = {
          minLength: settings['PASSWORD_MIN_LENGTH'],
          requireUppercase: settings['PASSWORD_REQUIRE_UPPERCASE'] === 'true',
          requireLowercase: settings['PASSWORD_REQUIRE_LOWERCASE'] === 'true',
          requireDigits: settings['PASSWORD_REQUIRE_DIGITS'] === 'true',
          requireSpecial: settings['PASSWORD_REQUIRE_SPECIAL'] === 'true'
        };
        this.passwordChangeSettingsForm = {
          reuseHistory: settings['PASSWORD_REUSE_HISTORY'],
          changeInterval: settings['PASSWORD_CHANGE_INTERVAL']
        };
      },
      error: err => {
        this. permission=false;
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            this.content = res.message;
          } catch {
            this.content = `Error with status: ${err.status} - ${err.statusText}`;
          }
        } else {
          this.content = `Error with status: ${err.status}`;
        }
      }
    });
  }
}


