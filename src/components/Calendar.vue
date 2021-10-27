<template>
   <div>
      <section >
        <div class="container mt-3">   
            <div class="block-shadow">    

            <!-- Вывод заголовка:  месяц и год --> 
            <div class="head-calendar">
               <div class="arrow arrow-left">
                     <p @click="back">&lsaquo;</p>   
                    </div>
                    <h3>{{ header }}</h3>
                    <div class="arrow arrow-right">
                        <p @click="next"> &rsaquo; </p>
                    </div>
                </div>

            <table>
                  
           <!-- Вывод дней недели в заголовке -->       
           <tr class="calendar" >
				<th v-for="d in days" :key="d">{{d}}</th>
			</tr>
                
 
            <!-- Вывод данных в календарь --> 
     <tr v-for="week in calendar()" :key="week">					   
				<td v-for="day in week" :key="day"   > {{ day }} </td>
  	</tr>	
    

            </table>
            </div>           
           
        </div>
    </section>

   </div>
</template>

<script>

//     date: {},  просматриваемая дата
//     day:""     просматриваемый день
//     month:"",  просматриваеимый месяц
//     year:"",   просматриваемый год 


export default {
  data(){
    return{
       day:"",
       month:"",
       monthNumber:0,
       year:2021,
       days:["mon","tue", "wed", "thu", "fri", "sat", "sun"],
       months : ["January", "February", "March", "April", "May", "June",  "July", "August", "September", "October", "November", "December"]
     
    

    }
  },
  methods: {

   // Формирование массива для последующего вывода дней в календарь
   calendar() {
         

			let days = []; // массив дней        
			let week = 0;  // номер недели
			days[week] = [];             
            // days[0] - первая неделя, содержит элементы

           // Получение последнего дня в месяце
           // Обычно даты начинаются с 1, но технически возможно передать любое число, и дата сама себя поправит
           // Так что если передать 0, то это значение будет соответствовать «один день перед первым числом месяца», 
           // другими словами: «последнее число прошлого месяца»
           // Поскольку передаем следующий месяц- this.monthNumber + 1 - возращается последний день текущего месяца
			let dlast = new Date(this.year, this.monthNumber + 1, 0).getDate();
                 
                // Цикл по дням- с первого дня месяца до последнего 
                for (let i = 1; i <= dlast; i++) {

                   // getDay возвращает целое число, обозначающее день недели: 1 - понедельник             
                    if (new Date(this.year, this.monthNumber, i).getDay() != 1) {
						days[week].push(i);					
						}
                     else {
                        week++;						
                        days[week] = [];

                        days[week].push(i);
						
						}
                    }
                 
				if (days[0].length > 0) {
					for (let i = days[0].length; i < 7; i++) {
						days[0].unshift('');						
					}
				}
				  
                console.table(days);
                
                // Возвращаем массив дней месяца
				return days;
			},    


  // Переход на месяц раньше
  back(){
       this.monthNumber--;
       // Если получается месяц меньше 0- просматривать будем предыдущий год
       if (this.monthNumber < 0) {
       this.monthNumber = 12;
       this.monthNumber--;
       this.year--;
                    }
       // Получаем название месяца из его номера            
       this.month = this.getMonthMethod(this.monthNumber)

  },
  // Переход на месяц позже
  next(){
         // Если получается месяц > 11- просматривать будем будущий год
       this.monthNumber++;
           if (this.monthNumber > 11) {
           this.monthNumber = -1;
           this.monthNumber++;
           this.year++;
                    }
        // Получаем название месяца из его номера                 
       this.month = this.getMonthMethod(this.monthNumber)            
  },
  computed:{
      // Выводим название месяца и год в заголовке календаря
   header(){
     return   this.month + " " + this.year
   },
   

 
  },

// Получение из  массива месяцев this.mothhs наименования месяца в виде строки
getMonthMethod(monthNumber){   
   let nameMonth = this.months[monthNumber];
   return  nameMonth
   }

  },
  computed: {
     header(){
       return this.month + " " + this.year
     }


  },

  created(){
    // Используем хук created на этапе создаения приложения- считываем текущую дату
    // Он вызывается до построения DOM-дерева
    let date =  new Date()              // получаем текущую дату

    this.day   = date.getDate()           // используем стандартный метод для получения дня месяца   

    this.monthNumber = date.getMonth()   // номер просматриваемого месяца 0-11 
    this.month = this.getMonthMethod(this.monthNumber)    // используем собственный метод для получение наименования месяца
    this.year  = +date.getFullYear()       // используем стандартный метод для получения года
  
  } 
  
}
</script>




<!-- Стили только для этого файла (scoped) -->

<style scoped >

.container{
    min-width: 800px;
}

.block-shadow {
    box-shadow: 0 4px 4px rgba(148, 113, 113, 0.2);
    width: 50%; 
}
table {
    border: 1px solid #eceff2;
    border-top: none;
     width: 100%;
    table-layout: fixed;
    text-align: center;
    padding: 30px;
}
tr, th, td {
    padding: 15px;
}

th {
    padding-top: 0;
    color: #3e3ecf;
    text-transform: uppercase;
    font-weight: 400;
}
td {
    color: grey;
}
.head-calendar {
    border-top: 1px solid #eceff2;
    border-left: 1px solid #eceff2;
    border-right: 1px solid #eceff2;
    padding: 25px;
    justify-content: space-between;
    display: flex;
    padding-bottom: 0;
   width: 100%;
}
.arrow p {
    cursor: pointer;
    color: grey;
    font-size: 30px;
}
.calendar {
    padding-top: 0;
    border-bottom: 1px solid #eceff2;;
}
h3 {
    color:grey;
    font-weight: 400;
}

.month p {
    text-transform: uppercase;
    font-size: 12px;
    margin-bottom: 0;
    margin-top: -10px;
}
.month-new p {
    text-transform: uppercase;
    margin-top: -10px;
    margin-bottom: 0;
    font-size: 12px;
}



</style>
