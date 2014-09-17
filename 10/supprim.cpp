#include <vector>
#include <iostream>
#include <fstream>

int main() {
	int magic = 148933;

	std::cout << "Initializing\n";

	auto *current = new std::vector<int>();
	current->reserve(1000000);

	auto *other = new std::vector<int>();
	other->reserve(1000000);

	std::vector<int> *temp = nullptr;

	current->push_back(2);
	for (auto i = 3; i < 2000000; i += 2) {
		current->push_back(i);
	}

	std::cout << "Starting search\n";

	int ctr = 0;
	while (ctr < current->size() && current->size() != magic) {
		int currentPrime = (*current)[ctr];
		
		for (auto n : (*current)) {
			if (n == currentPrime || n % currentPrime != 0) {
				other->push_back(n);
			}
		}

		temp = current;
		current = other;
		other = temp;
		temp = nullptr;

		other->clear();

		ctr++;

		if (ctr % 10 == 0) std::cout << "Ctr = " << ctr << ", current size: " << current->size() << ", previous prime: " << (*current)[ctr-1] << ", final prime: " << (*current)[current->size() - 1] << "\n";
	}

	std::cout << "Done, writing to file";

	std::ofstream fs("primes.txt");
	
	for (auto prime : (*current)) {
		fs << prime << std::endl;
	}

	fs.close();

	delete current;
	delete other;
}
