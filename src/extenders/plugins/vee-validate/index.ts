import {extend, localize} from "vee-validate";
import {email, min, required} from "vee-validate/dist/rules";
import ru from 'vee-validate/dist/locale/ru.json';

extend('email', email);
extend('required', required);
extend('min', min);

localize('ru', ru);