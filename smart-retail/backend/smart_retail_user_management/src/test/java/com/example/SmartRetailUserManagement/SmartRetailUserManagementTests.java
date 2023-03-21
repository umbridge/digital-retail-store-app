//package com.example.SmartRetailUserManagement;
//
//import com.example.SmartRetailUserManagement.dto.UserMeasurementDTO;
//import com.example.SmartRetailUserManagement.dto.UserProfileDTO;
//import com.example.SmartRetailUserManagement.entity.UserMeasurement;
//import com.example.SmartRetailUserManagement.entity.UserProfile;
//import com.example.SmartRetailUserManagement.repository.CustomerRepository;
//import com.example.SmartRetailUserManagement.repository.UserMeasurementRepository;
//import com.example.SmartRetailUserManagement.repository.UserProfileRepository;
//import com.example.SmartRetailUserManagement.service.UserMeasurementService;
//import com.example.SmartRetailUserManagement.service.UserProfileService;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.Mockito;
//import org.mockito.MockitoAnnotations;
//import org.springframework.http.HttpStatus;
//
//import java.util.Optional;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static org.mockito.Mockito.doThrow;
//
//public class SmartRetailUserManagementTests {
//
//
// @Mock
// CustomerRepository customerRepository;
//
// @Mock
// UserMeasurementRepository userMeasurementRepository;
//
// @Mock
// UserProfileRepository userProfileRepository;
//
// @InjectMocks
// UserMeasurementService userMeasurementService;
//
// @InjectMocks
// UserProfileService userProfileService;
//
// @BeforeEach
// public void init() {
//  MockitoAnnotations.openMocks(this);
// }
//
//
// @Test
// public void testAddProfileParentIdNotExistReturnNotFound() {
//  //arrange
//  UserProfileDTO userProfileDTO = UserProfileDTO.builder().parent_user_id(1).build();
//  Mockito.when(customerRepository.existsById(1)).thenReturn(false);
//
//  //act
//  var result = userProfileService.addProfile(userProfileDTO);
//
//  //assert
//  assertEquals(404, result.getStatusCodeValue());
//  Mockito.verify(userProfileRepository, Mockito.times(0)).save(Mockito.any());
// }
//
// @Test
// public void testAddProfileParentIdExistReturnCreated() {
//  //arrange
//  UserProfileDTO userProfileDTO = UserProfileDTO.builder().parent_user_id(1).build();
//  Mockito.when(customerRepository.existsById(1)).thenReturn(true);
//
//  //act
//  var result = userProfileService.addProfile(userProfileDTO);
//
//  //assert
//  assertEquals(201, result.getStatusCodeValue());
//  Mockito.verify(userProfileRepository, Mockito.times(1)).save(Mockito.any());
//
// }
//
// @Test
// void deleteProfileReturnSuccess() {
//  long id = 1;
//
//  var result = userProfileService.deleteProfile(id);
//
//  Mockito.verify(userProfileRepository, Mockito.times(1)).deleteById(id);
//  assertEquals(200, result.getStatusCodeValue());
// }
//
// @Test
// void deleteProfileReturnException() {
//  long id = 1;
//  doThrow(new RuntimeException()).when(userProfileRepository).deleteById(id);
//
//  var result = userProfileService.deleteProfile(id);
//
//  assertEquals(404, result.getStatusCodeValue());
// }
//
// @Test
// void getProfilesByMainUserIdNotFound() {
//  Integer parent_id = 100;
//  Mockito.when(userProfileRepository.existsById(1000L)).thenReturn(false);
//
//  //act
//  var result = userProfileService.getProfilesByMainUserId(parent_id);
//
//  //assert
//  assertEquals(404, result.getStatusCodeValue());
//
// }
//
// @Test
// void updateProfile() {
//  long profile_id = 10;
//  UserProfileDTO userProfileDTO = UserProfileDTO.builder().id(profile_id).name("Test").gender("Male").build();
//  UserProfile userProfile = UserProfile.builder().id(profile_id).name("Test").gender("Male").build();
//  Mockito.when(userProfileRepository.existsById(profile_id)).thenReturn(false);
//
//  userProfileRepository.save(userProfile);
//  HttpStatus status = userProfileService.updateProfile(profile_id, userProfileDTO).getStatusCode();
//
//  assertEquals(HttpStatus.NOT_FOUND, status);
//
// }
//
// @Test
// void testGetProfileByIdReturnProfile() {
//  long testProfileId = 234;
//  Optional<UserProfile> userProfile = Optional.of(UserProfile.builder().id(234).build());
//  Mockito.when(userProfileRepository.findById(testProfileId)).thenReturn(userProfile);
//
//  var result = userProfileService.getProfileById(234);
//
//  assertEquals(200, result.getStatusCodeValue());
// }
//
// @Test
// void testGetProfileByIdNotExistReturnNotFound() {
//  long testProfileId = 23;
//  Optional <UserProfile> userProfile = Optional.of(UserProfile.builder().id(13).build());
//  Mockito.when(userProfileRepository.existsById(testProfileId)).thenReturn(false);
//
//  var result = userProfileService.getProfileById(23);
//
//  assertEquals(404, result.getStatusCodeValue());
// }
//
//
//
// @Test
// void getUserMeasurementById() {
//  long profile_id = 10;
//  UserMeasurement userData = UserMeasurement.builder().profile_id(new UserProfile()).build();
//  Mockito.when(userMeasurementRepository.getByProfileID(profile_id)).thenReturn(Optional.ofNullable(userData));
//
//  HttpStatus status = userMeasurementService.getUserMeasurementById(profile_id).getStatusCode();
//  assertEquals(HttpStatus.OK, status);
// }
//
// @Test
// void addMeasurement() {
//  UserMeasurementDTO userMeasurementDTO = UserMeasurementDTO.builder().profile_id(10).height(169.5).build();
//  UserMeasurement userMeasurement = UserMeasurement.builder().profile_id(UserProfile.builder().id(10).build()).height(169.5).build();
//
//  Mockito.when(userProfileRepository.existsById(10L)).thenReturn(true);
//
//  HttpStatus status = userMeasurementService.addMeasurement(userMeasurementDTO).getStatusCode();
//
//  assertEquals(HttpStatus.CREATED, status);
//
// }
//
// @Test
// void deleteMeasurement() {
// }
//
// @Test
// void updateMeasurement() {
// }
//
// @Test
// void updateSizeInMeasurement() {
// }
//}
//
//
//
//// package com.example.SmartRetailUserManagement;
//
//
////import SmartRetailFramework.dto.ResponseHandler;
//// import com.example.SmartRetailUserManagement.dto.CustomerRegisterDTO;
//// import com.example.SmartRetailUserManagement.dto.UserMeasurementDTO;
//// import com.example.SmartRetailUserManagement.dto.UserProfileDTO;
//// import com.example.SmartRetailUserManagement.entity.UserMeasurement;
//// import com.example.SmartRetailUserManagement.entity.UserProfile;
//// import com.example.SmartRetailUserManagement.repository.CustomerRepository;
//// import com.example.SmartRetailUserManagement.repository.UserMeasurementRepository;
//// import com.example.SmartRetailUserManagement.repository.UserProfileRepository;
//// import com.example.SmartRetailUserManagement.service.JwtUserDetailsService;
//// import com.example.SmartRetailUserManagement.service.UserMeasurementService;
//// import com.example.SmartRetailUserManagement.service.UserProfileService;
//// import org.junit.jupiter.api.AfterAll;
//// import org.junit.jupiter.api.BeforeAll;
//// import org.junit.jupiter.api.Test;
//// import org.springframework.beans.factory.annotation.Autowired;
//// import org.springframework.boot.test.context.SpringBootTest;
//// import org.springframework.http.HttpStatus;
//// import org.springframework.http.ResponseEntity;
//// import org.springframework.security.core.userdetails.UserDetails;
//
//// import java.util.List;
//// import java.util.Optional;
//
//// import static org.junit.jupiter.api.Assertions.assertEquals;
//// import static org.junit.jupiter.api.Assertions.assertNotNull;
//
//// @SpringBootTest
//// class SmartRetailUserManagementTests {
//
//// 	@Autowired
//// 	UserProfileService userProfileService;
//
//// 	@Autowired
//// 	UserProfileRepository userProfileRepository;
//
//// 	@Autowired
//// 	UserMeasurementService userMeasurementService;
//
//// 	@Autowired
//// 	JwtUserDetailsService jwtUserDetailsService;
//
//// 	@Autowired
//// 	CustomerRepository customerRepository;
//
//// 	@Autowired
//// 	UserMeasurementRepository userMeasurementRepository;
//
//
//// 	@Test
//// 	public void oneTestAddProfile(){
//
//// 		CustomerRegisterDTO customer= new CustomerRegisterDTO();
//// 		customer.setUserId(1001);
//// 		customer.setName("Test4");
//// 		customer.setEmail("unit_test_user7@gmail.com");
//// 		customer.setPhoneNumber("5234567890");
//// 		customer.setPassword("Password@123");
//
//// 		userProfileService.addCustomertoTest(customer);
//
//// 		int id = customerRepository.findByEmail("unit_test_user7@gmail.com").getUserId();
//
//// 		System.out.println(id);
//
//// 		UserProfileDTO addProfile = new UserProfileDTO(1,"test-name","test-date","M",id);
//
//// 		System.out.println("working?");
//
//
//// 		HttpStatus checkStatus = userProfileService.addProfile(addProfile).getStatusCode();
//
//// 		List<UserProfile> getUsers = userProfileRepository.getProfiles(id);
//
//// 		long user_profile_id = getUsers.get(0).getId();
//
//// 		System.out.println("check11");
//
//// 		System.out.println(user_profile_id);
//
//
//// 		assertEquals(HttpStatus.CREATED,checkStatus);
//
//// //		Deleting the User Profile and Customer from both the tables
//// 		userProfileRepository.deleteById(user_profile_id);
//
//// 		System.out.println("User Profile Deleted successfully");
//
//// 		customerRepository.deleteById(id);
//
//// 		System.out.println("Customer Deleted successfully");
//
//// 	}
//
//// 	@Test
//// 	public void twoTestErrorProfile(){
//
//// 		UserProfileDTO addProfile = new UserProfileDTO(2,"test-name","test-date","M",10);
//
//
//// 		HttpStatus checkStatus = userProfileService.addProfile(addProfile).getStatusCode();
//
//
//// 		assertEquals(HttpStatus.NOT_FOUND,checkStatus);
//
//
//
//// 	}
//
//
//// 	@Test
//// 	public void threeTestGetProfilesByParentID(){
//
//
//// 		CustomerRegisterDTO customer= new CustomerRegisterDTO();
//// 		customer.setUserId(1001);
//// 		customer.setName("Test4");
//// 		customer.setEmail("unit_test_user7@gmail.com");
//// 		customer.setPhoneNumber("5234567890");
//// 		customer.setPassword("Password@123");
//
//// 		userProfileService.addCustomertoTest(customer);
//
//// 		int id = customerRepository.findByEmail("unit_test_user7@gmail.com").getUserId();
//
//// 		System.out.println(id);
//
//// 		UserProfileDTO addProfile = new UserProfileDTO(2,"test-name","test-date","M",id);
//
//// 		userProfileService.addProfile(addProfile).getStatusCode();
//
//// 		List<UserProfile> getUsers = userProfileRepository.getProfiles(id);
//
//// 		long user_profile_id = getUsers.get(0).getId();
//
//
//
//
//// 		HttpStatus getProfile = userProfileService.getProfilesByMainUserId(id).getStatusCode();
//
//// 		System.out.println(getProfile);
//
//
//// 		assertEquals(HttpStatus.OK,getProfile);
//
//
//// 		// Deleting the User Profile and Customer from both the tables
//// 		userProfileRepository.deleteById(user_profile_id);
//
//// 		System.out.println("User Profile Deleted successfully");
//
//// 		customerRepository.deleteById(id);
//
//// 		System.out.println("Customer Deleted successfully");
//
//
//
//
//
//// 	}
//
//// 	@Test
//// 	public void fourGetErrorProfiles(){
//
//// 		HttpStatus errorStatus = userProfileService.getProfilesByMainUserId(1000).getStatusCode();
//
//
//// 		assertEquals(HttpStatus.NOT_FOUND,errorStatus);
//
//
//// 	}
//
//// 	@Test
//// 	public void fiveGetProfileByProfileID(){
//
//// 		CustomerRegisterDTO customer= new CustomerRegisterDTO();
//// 		customer.setUserId(1001);
//// 		customer.setName("Test4");
//// 		customer.setEmail("unit_test_user7@gmail.com");
//// 		customer.setPhoneNumber("5234567890");
//// 		customer.setPassword("Password@123");
//
//// 		userProfileService.addCustomertoTest(customer);
//
//// 		int id = customerRepository.findByEmail("unit_test_user7@gmail.com").getUserId();
//
//// 		System.out.println(id);
//
//// 		UserProfileDTO addProfile = new UserProfileDTO(2,"test-name","test-date","M",id);
//
//// 		userProfileService.addProfile(addProfile);
//
//// 		List<UserProfile> getUsers = userProfileRepository.getProfiles(id);
//
//// 		long user_profile_id = getUsers.get(0).getId();
//
//
//// 		HttpStatus checkStatus = userProfileService.getProfileById(user_profile_id).getStatusCode();
//
//// 		assertEquals(HttpStatus.OK,checkStatus);
//
//// 		userProfileRepository.deleteById(user_profile_id);
//
//// 		System.out.println("User Profile Deleted successfully");
//
//// 		customerRepository.deleteById(id);
//
//// 		System.out.println("Customer Deleted successfully");
//
//
//// 	}
//
//
//// 	@Test
//// 	public void sixGetErrorProfile(){
//
//// 		HttpStatus checkStatus = userProfileService.getProfileById(100).getStatusCode();
//
//// 		assertEquals(HttpStatus.NOT_FOUND,checkStatus);
//
//// 	}
//
//
//// 	@Test
//// 	public void sevenUpdateProfile(){
//
//
//// 		CustomerRegisterDTO customer= new CustomerRegisterDTO();
//// 		customer.setUserId(1001);
//// 		customer.setName("Test4");
//// 		customer.setEmail("unit_test_user7@gmail.com");
//// 		customer.setPhoneNumber("5234567890");
//// 		customer.setPassword("Password@123");
//
//// 		userProfileService.addCustomertoTest(customer);
//
//// 		int id = customerRepository.findByEmail("unit_test_user7@gmail.com").getUserId();
//
//// 		System.out.println(id);
//
//// 		UserProfileDTO addProfile = new UserProfileDTO(2,"test-name","test-date","M",id);
//
//// 		userProfileService.addProfile(addProfile);
//
//// 		List<UserProfile> getUsers = userProfileRepository.getProfiles(id);
//
//// 		long user_profile_id = getUsers.get(0).getId();
//
//
//
//// 		UserProfileDTO updateProfile = new UserProfileDTO(user_profile_id,"update-name","update-date","M",id);
//
//// 		HttpStatus updateData = userProfileService.updateProfile(user_profile_id,updateProfile).getStatusCode();
//
//// 		System.out.println(updateData);
//
//
//// 		assertEquals(HttpStatus.OK,updateData);
//
//
//// 		userProfileRepository.deleteById(user_profile_id);
//
//// 		System.out.println("User Profile Deleted successfully");
//
//// 		customerRepository.deleteById(id);
//
//// 		System.out.println("Customer Deleted successfully");
//
//
//
//// 	}
//
//// 	@Test
//// 	public void eightDeleteProfile(){
//
//// 		CustomerRegisterDTO customer= new CustomerRegisterDTO();
//// 		customer.setUserId(1001);
//// 		customer.setName("Test4");
//// 		customer.setEmail("unit_test_user7@gmail.com");
//// 		customer.setPhoneNumber("5234567890");
//// 		customer.setPassword("Password@123");
//
//// 		userProfileService.addCustomertoTest(customer);
//
//// 		int id = customerRepository.findByEmail("unit_test_user7@gmail.com").getUserId();
//
//// 		System.out.println(id);
//
//// 		UserProfileDTO addProfile = new UserProfileDTO(2,"test-name","test-date","M",id);
//
//// 		userProfileService.addProfile(addProfile);
//
//// 		List<UserProfile> getUsers = userProfileRepository.getProfiles(id);
//
//// 		long user_profile_id = getUsers.get(0).getId();
//
//// 		HttpStatus checkStatus = userProfileService.deleteProfile(user_profile_id).getStatusCode();
//
//// 		assertEquals(HttpStatus.OK,checkStatus);
//
//// 		System.out.println("User Profile Deleted successfully");
//
//// 		customerRepository.deleteById(id);
//
//// 		System.out.println("Customer Deleted successfully");
//
//
//// 	}
//
//// 	@Test
//// 	public void nineErrorDeleteProfile(){
//
//// 		HttpStatus errorStatus = userProfileService.deleteProfile(100009).getStatusCode();
//
//// 		assertEquals(HttpStatus.NOT_FOUND,errorStatus);
//// 	}
//
//
//// //
//// 	@Test
//// 	public void tenAddMeasurement(){
//
//
//
//// 		CustomerRegisterDTO customer= new CustomerRegisterDTO();
//// 		customer.setUserId(1001);
//// 		customer.setName("Test4");
//// 		customer.setEmail("unit_test_user7@gmail.com");
//// 		customer.setPhoneNumber("5234567890");
//// 		customer.setPassword("Password@123");
//
//// 		userProfileService.addCustomertoTest(customer);
//
//// 		int id = customerRepository.findByEmail("unit_test_user7@gmail.com").getUserId();
//
//// 		System.out.println(id);
//
//// 		UserProfileDTO addProfile = new UserProfileDTO(2,"test-name","test-date","M",id);
//
//// 		userProfileService.addProfile(addProfile);
//
//// 		List<UserProfile> getUsers = userProfileRepository.getProfiles(id);
//
//// 		long user_profile_id = getUsers.get(0).getId();
//
//// 		System.out.println(user_profile_id);
//
//// 		//measurement related testing
//
//// 		UserMeasurementDTO addMeasurement = new UserMeasurementDTO(1,user_profile_id,172.2,"ft","M","M");
//
//// 		userMeasurementService.addMeasurement(addMeasurement);
//
//// 		Optional<UserMeasurement> getMeasurement = userMeasurementRepository.getByProfileID(user_profile_id);
//
//// 		long measurement_id = getMeasurement.get().getId();
//
//// 		System.out.println(measurement_id);
//
//// 		assertNotNull("check");
//
//// 		System.out.println("Working till here");
//
//// 		userMeasurementRepository.deleteById(measurement_id);
//
//// 		System.out.println("Measurement data deleted successfully");
//
//// 		userProfileRepository.deleteById(user_profile_id);
//
//// 		System.out.println("User Profile Deleted successfully");
//
//// 		customerRepository.deleteById(id);
//
//// 		System.out.println("Customer Deleted successfully");
//
//
//// 	}
//
//// 	@Test
//// 	public void elevenGetMeasurementByProfileID(){
//
//// 		CustomerRegisterDTO customer= new CustomerRegisterDTO();
//// 		customer.setUserId(1001);
//// 		customer.setName("Test4");
//// 		customer.setEmail("unit_test_user7@gmail.com");
//// 		customer.setPhoneNumber("5234567890");
//// 		customer.setPassword("Password@123");
//
//// 		userProfileService.addCustomertoTest(customer);
//
//// 		int id = customerRepository.findByEmail("unit_test_user7@gmail.com").getUserId();
//
//// 		System.out.println(id);
//
//// 		UserProfileDTO addProfile = new UserProfileDTO(2,"test-name","test-date","M",id);
//
//// 		userProfileService.addProfile(addProfile);
//
//// 		List<UserProfile> getUsers = userProfileRepository.getProfiles(id);
//
//// 		long user_profile_id = getUsers.get(0).getId();
//
//// 		System.out.println(user_profile_id);
//
//// 		//measurement related testing
//
//// 		UserMeasurementDTO addMeasurement = new UserMeasurementDTO(1,user_profile_id,172.2,"ft","M","M");
//
//// 		userMeasurementService.addMeasurement(addMeasurement);
//
//// 		Optional<UserMeasurement> getMeasurement = userMeasurementRepository.getByProfileID(user_profile_id);
//
//// 		long measurement_id = getMeasurement.get().getId();
//
//// 		System.out.println(measurement_id);
//
//// 		HttpStatus checkStatus = userMeasurementService.getUserMeasurementById(user_profile_id).getStatusCode();
//
//// 		System.out.println(checkStatus);
//
//// 		assertEquals(HttpStatus.OK,checkStatus);
//
//// 		userMeasurementRepository.deleteById(measurement_id);
//
//// 		System.out.println("Measurement data deleted successfully");
//
//// 		userProfileRepository.deleteById(user_profile_id);
//
//// 		System.out.println("User Profile Deleted successfully");
//
//// 		customerRepository.deleteById(id);
//
//// 		System.out.println("Customer Deleted successfully");
//// 	}
//
//
//// 	@Test
//// 	public void twelveGetErrorMeasurement(){
//// 		HttpStatus errorStatus = userMeasurementService.getUserMeasurementById(11111).getStatusCode();
//
//// 		System.out.println(errorStatus);
//
//// 		assertEquals(HttpStatus.NOT_FOUND,errorStatus);
//
//
//// 	}
//
//// 	@Test
//// 	public void thirteenUpdateMeasurement(){
//
//// 		CustomerRegisterDTO customer= new CustomerRegisterDTO();
//// 		customer.setUserId(1001);
//// 		customer.setName("Test4");
//// 		customer.setEmail("unit_test_user7@gmail.com");
//// 		customer.setPhoneNumber("5234567890");
//// 		customer.setPassword("Password@123");
//
//// 		userProfileService.addCustomertoTest(customer);
//
//// 		int id = customerRepository.findByEmail("unit_test_user7@gmail.com").getUserId();
//
//// 		System.out.println(id);
//
//// 		UserProfileDTO addProfile = new UserProfileDTO(2,"test-name","test-date","M",id);
//
//// 		userProfileService.addProfile(addProfile);
//
//// 		List<UserProfile> getUsers = userProfileRepository.getProfiles(id);
//
//// 		long user_profile_id = getUsers.get(0).getId();
//
//// 		System.out.println(user_profile_id);
//
//// 		//measurement related testing
//
//// 		UserMeasurementDTO addMeasurement = new UserMeasurementDTO(1,user_profile_id,172.2,"ft","M","M");
//
//// 		userMeasurementService.addMeasurement(addMeasurement);
//
//// 		Optional<UserMeasurement> getMeasurement = userMeasurementRepository.getByProfileID(user_profile_id);
//
//// 		long measurement_id = getMeasurement.get().getId();
//
//// 		System.out.println(measurement_id);
//
//// 		UserMeasurementDTO updateMeasurement = new UserMeasurementDTO(measurement_id,user_profile_id,160,"ft","XL","XL");
//
//// 		HttpStatus checkStatus = userMeasurementService.updateMeasurement(user_profile_id,updateMeasurement).getStatusCode();
//
//// 		System.out.println(checkStatus);
//
//// 		assertEquals(HttpStatus.OK,checkStatus);
//
//// 		userMeasurementRepository.deleteById(measurement_id);
//
//// 		System.out.println("Measurement data deleted successfully");
//
//// 		userProfileRepository.deleteById(user_profile_id);
//
//// 		System.out.println("User Profile Deleted successfully");
//
//// 		customerRepository.deleteById(id);
//
//// 		System.out.println("Customer Deleted successfully");
//
//
//// 	}
//
//// 	@Test
//// 	public void fourteenErrorUpdateMeasurement(){
//
//// 		UserMeasurementDTO addMeasurement = new UserMeasurementDTO(1,2000,170.2,"ft","XL","XL");
//
//// 		HttpStatus errorStatus = userMeasurementService.updateMeasurement(111,addMeasurement).getStatusCode();
//
//
//// 		assertEquals(HttpStatus.NOT_FOUND,errorStatus);
//// 	}
//
//
//// 	@Test
//// 	public void fifteenDeleteMeasurement(){
//
//// 		CustomerRegisterDTO customer= new CustomerRegisterDTO();
//// 		customer.setUserId(1001);
//// 		customer.setName("Test4");
//// 		customer.setEmail("unit_test_user7@gmail.com");
//// 		customer.setPhoneNumber("5234567890");
//// 		customer.setPassword("Password@123");
//
//// 		userProfileService.addCustomertoTest(customer);
//
//// 		int id = customerRepository.findByEmail("unit_test_user7@gmail.com").getUserId();
//
//// 		System.out.println(id);
//
//// 		UserProfileDTO addProfile = new UserProfileDTO(2,"test-name","test-date","M",id);
//
//// 		userProfileService.addProfile(addProfile);
//
//// 		List<UserProfile> getUsers = userProfileRepository.getProfiles(id);
//
//// 		long user_profile_id = getUsers.get(0).getId();
//
//// 		System.out.println(user_profile_id);
//
//// 		//measurement related testing
//
//// 		UserMeasurementDTO addMeasurement = new UserMeasurementDTO(1,user_profile_id,172.2,"ft","M","M");
//
//// 		userMeasurementService.addMeasurement(addMeasurement);
//
//// 		Optional<UserMeasurement> getMeasurement = userMeasurementRepository.getByProfileID(user_profile_id);
//
//// 		long measurement_id = getMeasurement.get().getId();
//
//// 		System.out.println(measurement_id);
//
//
//
//// 		HttpStatus checkStatus = userMeasurementService.deleteMeasurement(measurement_id).getStatusCode();
//
//// 		assertEquals(HttpStatus.OK,checkStatus);
//
//// 		System.out.println("Measurement data deleted successfully");
//
//// 		userProfileRepository.deleteById(user_profile_id);
//
//// 		System.out.println("User Profile Deleted successfully");
//
//// 		customerRepository.deleteById(id);
//
//// 		System.out.println("Customer Deleted successfully");
//// 	}
//
//// 	@Test
//// 	public void sixteenUpdateSizeInMeasurement(){
//
//// 		CustomerRegisterDTO customer= new CustomerRegisterDTO();
//// 		customer.setUserId(1001);
//// 		customer.setName("Test4");
//// 		customer.setEmail("unit_test_user7@gmail.com");
//// 		customer.setPhoneNumber("5234567890");
//// 		customer.setPassword("Password@123");
//
//// 		userProfileService.addCustomertoTest(customer);
//
//// 		int id = customerRepository.findByEmail("unit_test_user7@gmail.com").getUserId();
//
//// 		System.out.println(id);
//
//// 		UserProfileDTO addProfile = new UserProfileDTO(2,"test-name","test-date","M",id);
//
//// 		userProfileService.addProfile(addProfile);
//
//// 		List<UserProfile> getUsers = userProfileRepository.getProfiles(id);
//
//// 		long user_profile_id = getUsers.get(0).getId();
//
//// 		System.out.println(user_profile_id);
//
//// 		//measurement related testing
//
//// 		UserMeasurementDTO addMeasurement = new UserMeasurementDTO(1,user_profile_id,172.2,"ft","M","M");
//
//// 		userMeasurementService.addMeasurement(addMeasurement);
//
//// 		Optional<UserMeasurement> getMeasurement = userMeasurementRepository.getByProfileID(user_profile_id);
//
//// 		long measurement_id = getMeasurement.get().getId();
//
//// 		System.out.println(measurement_id);
//
//
//// 		UserMeasurementDTO updateMeasurement = new UserMeasurementDTO(measurement_id,user_profile_id,170.2,"ft","XXL","XL");
//
//// 		HttpStatus checkStatus = userMeasurementService.updateSizeInMeasurement(user_profile_id,updateMeasurement).getStatusCode();
//
//// 		System.out.println(checkStatus);
//
//// 		assertEquals(HttpStatus.OK,checkStatus);
//
//
//// 		System.out.println("Measurement data deleted successfully");
//
//// 		userProfileRepository.deleteById(user_profile_id);
//
//// 		System.out.println("User Profile Deleted successfully");
//
//// 		customerRepository.deleteById(id);
//
//// 		System.out.println("Customer Deleted successfully");
//
//
//// 	}
//
//// 	@Test
//// 	public void seventeenErrorUpdateSize(){
//
//// 		UserMeasurementDTO addMeasurement = new UserMeasurementDTO(1,2,170.2,"ft","XL","XL");
//
//// 		HttpStatus errorStatus = userMeasurementService.updateSizeInMeasurement(11111,addMeasurement).getStatusCode();
//
//// 		System.out.println(errorStatus);
//
//// 		assertEquals(HttpStatus.NOT_FOUND,errorStatus);
//
//
//
//// 	}
//
//// 	@Test
//// 	public void eighteenFindByUsername(){
//
//// 		CustomerRegisterDTO customer= new CustomerRegisterDTO();
//// 		customer.setUserId(1001);
//// 		customer.setName("Test4");
//// 		customer.setEmail("unit_test_user7@gmail.com");
//// 		customer.setPhoneNumber("5234567890");
//// 		customer.setPassword("Password@123");
//
//// 		userProfileService.addCustomertoTest(customer);
//
//// 		int id = customerRepository.findByEmail("unit_test_user7@gmail.com").getUserId();
//
//// 		System.out.println(id);
//
//// 		UserDetails checkStatus = jwtUserDetailsService.loadUserByUsername("unit_test_user7@gmail.com");
//
//// 		System.out.println(checkStatus);
//
//
//// 		assertNotNull(checkStatus);
//
//// 		customerRepository.deleteById(id);
//
//// 		System.out.println("Customer Deleted successfully");
//
//// 	}
//
//
//// 	@Test
//// 	public void nineteendummy1(){
//
//// 		String check = "testcase-1";
//
//// 		assertNotNull(check);
//// 	}
//
//
//// 	@Test
//// 	public void twentydummy2(){
//// 		String check = "testcase-2";
//
//// 		assertNotNull(check);
//
//// 	}
//
//
//
//
//// }
