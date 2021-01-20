export interface IUserInterface {
	name: string;
	gender: string;
	email: string;
	address: string;
	city: string;
	state: string;
	country: string;
	photo: string;
	hobby: string;
	password: string;
	_id?: string;
}

export interface IUserLogin {
	email: string;
	password: string;
}