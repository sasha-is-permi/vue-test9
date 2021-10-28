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
				<th v-for="d in daysOfWeek" :key="d">{{d}}</th>
			</tr>
                
 
            <!-- Вывод данных в календарь --> 
     <tr v-for="week in calendar()" :key="week">					   
			
            <td v-for="day in week" :key="day"   >

            <!-- Если 1-е число месяца- подписываем начало месяца сверху. Берем только первые 3 символа -->
            <div class="month" v-if="day===1"><p>{{month.substr(0,3)}}</p></div>                  
                    {{ day }}
            </td>

  	</tr>	
    

            </table>
            </div>           
           
        </div>
    </section>

   </div>
</template>

<script>

//     days = []; // массив дней в календаре (включает все 3 месяца)  

//     day:""     просматриваемый день
//     month:"",  просматриваемый месяц
//     monthNumber:0, номер просматреваемого месяца 
//     year:"",   просматриваемый год 

//     previousDay:""     дни в предыдущем месяце
//     previousMonth:"",  предыдущий месяц
//     previousMonthNumber:0, номер предыдущего месяца 
//     previousYear:"",   предыдущий год

//     nextDay:""         дни в следующем месяце
//     nextMonth:"",      следующий месяц 
//     nextMonthNumber:0, номер следующего месяца
//     nextYear:"",       следующий год


//     Массивы дней недели и месяцев: 
//     daysOfWeek:["mon","tue", "wed", "thu", "fri", "sat", "sun"],
//     months : ["January", "February", "March", "April", "May", "June",  "July", "August", "September", "October", "November", "December"],

export default {
  data(){
    return{
        
       days: [],    
       day:"",
       month:"",
       monthNumber:0,
       year:2021,

       previousDay:"", 
       previousMonth:"",
       previousMonthNumber:0, 
       previousYear:"",

       nextDay:"",
       nextMonth:"",
       nextMonthNumber:0,      
       nextYear:"",

       daysOfWeek:["mon","tue", "wed", "thu", "fri", "sat", "sun"],
       months : ["January", "February", "March", "April", "May", "June",  "July", "August", "September", "October", "November", "December"],

    }
  },
  methods: {

   // Формирование общего календаря на 5 недель (текущий выбранный месяц.
   // Может также включать конец прошлого месяца и начало будущего)

      calendar() {    

        // Календарь на текущий месяц. Меняет массив this.days      
        this.monthCalendar(this.monthNumber,this.year)

        return this.days;
			},    

      monthCalendar(monthNumber,year){
			    
			let week = 0;  // номер недели
			this.days[week] = [];             
            // this.days[0] - первая неделя, содержит элементы

           // Получение последнего дня в месяце
           // Обычно даты начинаются с 1, но технически возможно передать любое число, и дата сама себя поправит
           // Так что если передать 0, то это значение будет соответствовать «один день перед первым числом месяца», 
           // другими словами: «последнее число прошлого месяца»
           // Поскольку передаем следующий месяц- this.monthNumber + 1 - возращается последний день текущего месяца
			let dlast = new Date(year, monthNumber + 1, 0).getDate();
                 
                // Цикл по дням- с первого дня месяца до последнего 
                for (let i = 1; i <= dlast; i++) {

                   // getDay возвращает целое число, обозначающее день недели: 1 - понедельник             
                    if (new Date(year, monthNumber, i).getDay() != 1) {
                        // Если день недели не понедельник- заносим номер дня в массив для текущей недели this.days[week]
                        // (получается двумерный массив)
						this.days[week].push(i);					
						}
                     else {
                        // Если день недели  понедельник- начинаем новую неделю в двумерном массиве this.days[week]
                        // (получается двумерный массив)   
                        week++;
                        // создаем новый элемент массива						
                        this.days[week] = [];
                        //  заносим номер дня в массив
                        this.days[week].push(i);
						
						}
                    }
                 
                // Анализируем полученный массив. Если он не пустой.
				if (this.days[0].length > 0) {
                    // Смотрим- сколько дней в первой неделе. Если скажем 3- добавим 4 дня с номерами "" 
                    // поскольку они принадлежат прошлому месяцу, а мы выводим текущий
                    // для будущего месяца такое делать не обязательно
					for (let i = this.days[0].length; i < 7; i++) {
						this.days[0].unshift('');						
					}
				}
				  

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
