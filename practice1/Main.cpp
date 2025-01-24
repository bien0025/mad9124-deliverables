#include<iostream>
using namespace std;


class person {
public:
	person() {
		cout << "constructor created" << endl;
	};
	string name;
	person(string m_name) {
		cout << "constructor2 created" << endl;
		name = m_name;
	}
private:
	string dob;
	

public:
	void setDob(string m_dob) {
		dob = m_dob;
	}
	string getDob() {
		return dob;
	}

};

int main() {

	person p1;
	p1.name = "jack";
	cout << "Name is: " << p1.name << endl;

	p1.setDob("2023-12-23");
	cout << "The Dob is: "<<p1.getDob() << endl;

	person p2("Luke");
	cout << "Second name is: " << p2.name << endl;

	string stars(70, '*');
	cout << stars;
	return 0;
}