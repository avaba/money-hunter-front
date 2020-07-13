import {extend, localize} from "vee-validate";
import {email, min, required} from "vee-validate/dist/rules";
import ru from 'vee-validate/dist/locale/ru.json';

extend('email', {...email, message: 'Не валидный email'});
extend('required', {...required, message: 'Обязательно для заполнения'});
extend('min', {...min, message: 'Не менее {length} символов'});

localize('ru', ru);