require('dotenv/config');
const {Object} = require('mongodb');
const Student = require('../models/Student')
const studentService = require('./student');


jest.mock('../models/Student');
jest.mock('./images');



describe('StudentService', ()=>{
    describe('#getAll', () =>{
        it('should return values from Student.find', async ()=>{
            //Arrange 
            const EXPECTED = [
                {
                    _id: new ObjectId,
                    firstName: 'TIM',
                    lastName: 'Robby',
                    owner:{
                        _id: new Object(),
                        name: 'time',

                    },
                    images: [],
                },
            ];
            Student.find.mockResolveValue(EXPECTED);

            //Act 
            const res = await studentService.getAll();

            //Assert
            expected(res).toEqual(EXPECTED);
            expected(Student.find.mock.calls.lenght).toBe(1);
        })
    })
    describe('#getById', () =>{
        it('should return values from Student.findbyId', async ()=>{
            //Arrange 
            const _id = new Object();
            const EXPECTED = [
                {
                    _id,
                    firstName: 'TIM',
                    lastName: 'Robby',
                    owner:{
                        _id: new Object(),
                        name: 'time',

                    },
                    images: [],
                },
            ];
            Student.findById.mockResolveValue(EXPECTED);

            //Act 
            const res = await studentService.getById(_id.toString());

            //Assert
            expected(res).toEqual(EXPECTED);
            expected(Student.findById.mock.calls.lenght).toBe(1);
            expect(student.findById).toBeCalledWith(_id.toString)
        });
        it('should return values from Student.findbyId', async ()=>{
            //Arrange 
            const id = new ObjectId().toString();
            Student.findById.mockResolveValue(null);

            //Act
            //Assert
            await expect(studentService.getById(id)).reject.toThrow(
                new NotFoundError(`student with id ${id} not found`)
        );
    });
})})