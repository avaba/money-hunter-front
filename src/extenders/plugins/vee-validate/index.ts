import {extend, localize} from "vee-validate";
import {email, min, required} from "vee-validate/dist/rules";
import ru from 'vee-validate/dist/locale/ru.json';
import {phonenumber} from "@/extenders/plugins/vee-validate/phonenumber.rule";
import {isType} from "@/extenders/plugins/vee-validate/is_type.rule";

extend('email', { ...email, message: 'Неверный формат' });
extend('required', {...required, message: 'Обязательно для заполнения'});
extend('min', {...min, message: 'Не менее {length} символов'});
extend('phonenumber', phonenumber);
extend('is_type', isType);

localize('ru', ru);